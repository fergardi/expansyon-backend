var models = require('../models')
var express = require('express')
var router = express.Router()

const constants = require('../config/constants')
var socketio = require('../services/socketio').io()
var security = require('../services/security')
var jwt = require('../services/jwt')
var cron = require('../services/cron')
const factory = require('../factories/planet')

// add resources
cron.schedule('*/10 * * * * *', () => {
  models.Referendum.findOne({
    where: { active: true }
  })
  .then((referendum) => {
    var metalBonus = 1.0
    var crystalBonus = 1.0
    var oilBonus = 1.0
    if (referendum) {
      metalBonus += referendum.metal / 100
      crystalBonus += referendum.crystal / 100
      oilBonus += referendum.oil / 100
    }
    models.Player.findAll({
      include: [
        { model: models.Planet },
        { model: models.Building },
        { model: models.Skill }
      ]
    })
    .then((players) => {
      var queries = []
      players.forEach((player) => {
        var metal = 0
        var crystal = 0
        var oil = 0
        if (player.experience / (constants.up * player.level) >= 1) {
          player.level += player.experience / (constants.up * player.level)
          player.experience = player.experience % (constants.up * player.level)
        }
        player.getPlanets()
        .then((planets) => {
          planets.forEach((planet) => {
            metal += planet.metal
            crystal += planet.crystal
            oil += planet.oil
          })
          player.getSkills()
          .then((skills) => {
            skills.forEach((skill) => {
              metalBonus += skill.metal * skill.PlayerSkill.level / 100
              crystalBonus += skill.crystal * skill.PlayerSkill.level / 100
              oilBonus += skill.oil * skill.PlayerSkill.level / 100
            })
          })
          .then(() => {
            player.getBuildings()
            .then((buildings) => {
              buildings.forEach((building) => {
                switch (building.name) {
                  case 'building.furnace.name':
                    metalBonus += building.PlayerBuilding.quantity / 100
                    break
                  case 'building.factory.name':
                    crystalBonus += building.PlayerBuilding.quantity / 100
                    break
                  case 'building.refinery.name':
                    oilBonus += building.PlayerBuilding.quantity / 100
                    break
                }
              })
              player.metal += Math.floor(metal * metalBonus)
              player.crystal += Math.floor(crystal * crystalBonus)
              player.oil += Math.floor(oil * oilBonus)
              queries.push(player.save())
            })
          })
        })
      })
      Promise.all(queries)
      .then((result) => {
        socketio.emit('player', null)
      })
      .catch((err) => {
        console.error(err)
      })
    })
  })
})

// POST /api/player/login
router.post('/login', (req, res) => {
  models.Player.findOne({
    where: { email: req.body.email, password: req.body.password }
  })
  .then((player) => {
    if (player) {
      var token = jwt.token(player)
      res.status(200).json({ id: player.id, token: token })
    } else {
      res.status(401).end()
    }
  })
})

// POST /api/player/register
router.post('/register', (req, res) => {
  models.Player.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    image: 'image',
    metal: 0,
    crystal: 0,
    oil: 0,
    aether: 0,
    experience: 0,
    level: 0
  })
  .then((player) => {
    if (player) {
      models.Ship.findAll()
      .then((ships) => {
        ships.forEach((ship) => {
          player.addShip(ship, { quantity: 0 })
        })
      })
      models.Building.findAll()
      .then((buildings) => {
        buildings.forEach((building) => {
          player.addBuilding(building, { quantity: 0 })
        })
      })
      models.Tower.findAll()
      .then((towers) => {
        towers.forEach((tower) => {
          player.addTower(tower, { quantity: 0 })
        })
      })
      models.Planet.create(factory.build(true))
      .then((planet) => {
        player.addPlanet(planet)
      })
      var token = jwt.token(player)
      res.status(201).json({ id: player.id, token: token })
    } else {
      res.status(409).end()
    }
  })
  .catch(() => {
    res.status(409).end()
  })
})

// POST /api/player/email
router.post('/email', (req, res) => {
  models.Player.findOne({
    where: { email: req.body.email }
  })
  .then((player) => {
    if (player) {
      res.status(302).end()
    } else {
      res.status(200).end()
    }
  })
})

// POST /api/player/name
router.post('/name', (req, res) => {
  models.Player.findOne({
    where: { name: req.body.name }
  })
  .then((player) => {
    if (player) {
      res.status(302).end()
    } else {
      res.status(200).end()
    }
  })
})

// GET /api/player
router.get('/', security.secured, (req, res) => {
  models.Player.findAll({
    include: [
      { model: models.Planet, separate: true },
      { model: models.Faction },
      { model: models.Guild }
    ],
    attributes: { exclude: ['email', 'password'] }
  })
  .then((players) => {
    var info = []
    players.forEach((player) => {
      player = player.toJSON()
      player.influence = player.Planets.reduce((total, planet) => total + planet.influence, 0)
      info.push(player)
    })
    res.status(200).json(info)
  })
})

// GET /api/player/playerId
router.get('/:playerId', security.secured, (req, res) => {
  models.Player.findOne({
    where: { id: parseInt(req.params.playerId) },
    include: [
      { model: models.Guild },
      { model: models.Faction },
      { model: models.Planet, separate: true },
      { model: models.Relic },
      { model: models.Ship },
      { model: models.Building },
      { model: models.Tower },
      // { model: models.Skill },
      // { model: models.Achievement },
      { model: models.Message, separate: true, as: 'Sent', include: { model: models.Player, as: 'To', attributes: ['name'], include: { model: models.Faction } } },
      { model: models.Message, separate: true, as: 'Received', include: { model: models.Player, as: 'From', attributes: ['name'], include: { model: models.Faction } } }
    ],
    attributes: { exclude: ['password', 'token'] }
  })
  .then((player) => {
    if (player) {
      // extend object
      var info = player.toJSON()
      // own planets plus 0 to avoid query crashes
      var planetIds = player.Planets.map((planet) => planet.id)
      planetIds.push(0)
      // queries
      var queries = []
      // transmission
      queries.push(player.getReceived({ order: 'datetime DESC' }))
      // planetarium
      queries.push(player.getPlanets({ order: 'id ASC' }))
      // hangar
      queries.push(player.getShips({ order: 'id ASC' }))
      // infrastructure
      queries.push(player.getBuildings({ order: 'id ASC' }))
      // defense
      queries.push(player.getTowers({ order: 'id ASC' }))
      // relicarium
      queries.push(player.getRelics({ order: 'id ASC' }))
      // tree
      queries.push(models.Tree.findAll({ order: 'id ASC' }))
      // research
      queries.push(player.getSkills({ order: 'id ASC' }))
      // achievements
      queries.push(player.getAchievements({ order: 'id ASC' }))
      // temple
      queries.push(models.Faction.count())
      // store
      queries.push(models.Relic.count({ where: { store: true } }))
      // market
      queries.push(models.Sale.count())
      // senate
      queries.push(models.Referendum.count({ where: { visible: true } }))
      // cantina
      queries.push(models.Mission.count({ where: { visible: true } }))
      // exploration
      queries.push(models.Planet.findAll({ where: { $and: [ { id: { $notIn: planetIds } }, { visible: true } ] } }))
      // census
      queries.push(models.Player.count())
      // guild
      queries.push(models.Guild.count())
      // referendum
      queries.push(models.Referendum.findOne({ where: { active: true } }))
      // ALL
      Promise.all(queries)
      .then((results) => {
        // transmission
        info.transmission = results[0].length
        // planetarium
        info.planetarium = results[1].length
        info.size = results[1].reduce((total, planet) => total + planet.size, 0)
        info.energy = results[1].reduce((total, planet) => total + planet.energy, 0)
        info.influence = results[1].reduce((total, planet) => total + planet.influence, 0)
        // hangar
        info.hangar = results[2].reduce((total, ship) => total + ship.PlayerShip.quantity, 0)
        info.fighter = results[2][0].PlayerShip.quantity
        info.cruiser = results[2][1].PlayerShip.quantity
        info.bomber = results[2][2].PlayerShip.quantity
        info.orbiter = results[2][3].PlayerShip.quantity
        info.carrier = results[2][4].PlayerShip.quantity
        info.recycler = results[2][5].PlayerShip.quantity
        // infrastructure
        info.infrastructure = results[3].reduce((total, building) => total + building.PlayerBuilding.quantity, 0)
        info.furnace = results[3][0].PlayerBuilding.quantity
        info.factory = results[3][1].PlayerBuilding.quantity
        info.refinery = results[3][2].PlayerBuilding.quantity
        info.plant = results[3][3].PlayerBuilding.quantity
        info.barrier = results[3][4].PlayerBuilding.quantity
        info.warehouse = results[3][5].PlayerBuilding.quantity
        // defense
        info.defense = results[4].reduce((total, tower) => total + tower.PlayerTower.quantity, 0)
        info.blaster = results[4][0].PlayerTower.quantity
        info.railgun = results[4][1].PlayerTower.quantity
        info.cannon = results[4][2].PlayerTower.quantity
        // relicarium
        info.relicarium = results[5].reduce((total, relic) => total + relic.PlayerRelic.quantity, 0)
        // research
        info.Tree = results[6].map((tree) => {
          var branch = tree.toJSON()
          branch.Skills = results[7].filter((skill) => skill.TreeId === branch.id)
          return branch
        })
        info.research = player.level - results[7].reduce((total, skill) => total + skill.PlayerSkill.level, 0)
        // achievements
        info.Achievements = results[8]
        // temple
        info.temple = results[9]
        // store
        info.store = results[10]
        // market
        info.market = results[11]
        // senate
        info.senate = results[12]
        // cantina
        info.cantina = results[13]
        // exploration
        info.Exploration = results[14]
        // census
        info.census = results[15]
        // guilds
        info.guilds = results[16]
        // referendum
        info.Referendum = results[17]
        // extra
        info.secure = info.warehouse * 100
        info.up = constants.up
        info.cap = constants.cap
        // return all info
        res.status(200).json(info)
      })
      .catch((error) => {
        console.error(error)
        res.status(500).end()
      })
    } else {
      res.status(400).end()
    }
  })
})

// GET /api/player/playerId/store/relicId
router.post('/:playerId/store/:relicId', security.secured, (req, res) => {
  models.Player.findById(parseInt(req.params.playerId))
  .then((player) => {
    if (player) {
      models.Relic.findById(parseInt(req.params.relicId))
      .then((relic) => {
        if (relic) {
          if (relic.aether <= player.aether) {
            player.getRelics({
              where: { id: relic.id }
            })
            .then((relics) => {
              if (relics.length > 0) {
                relics[0].PlayerRelic.quantity++
                relics[0].PlayerRelic.save()
              } else {
                player.addRelic(relic, { quantity: 1 })
              }
              player.aether -= relic.aether
              player.save()
              .then((player) => {
                socketio.emit('player', player.id)
                res.status(200).end()
              })
            })
          } else {
            res.status(400).end()
          }
        } else {
          res.status(400).end()
        }
      })
    } else {
      res.status(400).end()
    }
  })
})

// GET /api/player/playerId/market/saleId
router.post('/:playerId/market/:saleId', security.secured, (req, res) => {
  models.Player.findById(parseInt(req.params.playerId))
  .then((player) => {
    if (player) {
      models.Sale.findOne({
        where: { id: parseInt(req.params.saleId) },
        include: [
          { model: models.Player },
          { model: models.Ship },
          { model: models.Relic },
          { model: models.Planet }
        ]
      })
      .then((sale) => {
        if (sale) {
          if (sale.metal <= player.metal && sale.crystal <= player.crystal && sale.oil <= player.oil && sale.aether <= player.aether) {
            var queries = []
            player.metal -= sale.metal
            sale.Player.metal += sale.metal
            player.crystal -= sale.crystal
            sale.Player.crystal += sale.crystal
            player.oil -= sale.oil
            sale.Player.oil += sale.oil
            player.aether -= sale.aether
            sale.Player.aether += sale.aether
            if (sale.Ship) {
              player.getShips({
                where: { id: sale.Ship.id }
              })
              .then((ships) => {
                if (ships.length > 0) {
                  var ship = ships[0]
                  ship.PlayerShip.quantity += sale.quantity
                  ship.PlayerShip.save()
                  queries.push(player.save())
                  queries.push(sale.Player.save())
                } else {
                  res.status(400).end()
                }
              })
            } else if (sale.Relic) {
              player.getRelics({
                where: { id: sale.Relic.id }
              })
              .then((relics) => {
                if (relics.length > 0) {
                  var relic = relics[0]
                  relic.PlayerRelic.quantity += sale.quantity
                  relic.PlayerRelic.save()
                } else {
                  player.addRelic(sale.Relic, { quantity: 1 })
                }
                queries.push(player.save())
                queries.push(sale.Player.save())
              })
            } else if (sale.Planet) {
              player.addPlanet(sale.Planet)
              queries.push(player.save())
              queries.push(sale.Player.save())
            }
            Promise.all(queries)
            .then((results) => {
              sale.destroy()
              .then((result) => {
                var message = {
                  subject: 'transmission.market.subject',
                  text: 'transmission.market.text',
                  From: player.id,
                  To: sale.Player.id
                }
                models.Message.create(message)
                .then((message) => {
                  socketio.emit('player', player.id)
                  socketio.emit('player', sale.Player.id)
                  socketio.emit('transmission', sale.Player.id)
                  socketio.emit('market')
                  res.status(200).end()
                })
              })
            })
            .catch((error) => {
              console.error(error)
              res.status(500).end()
            })
          } else {
            res.status(400).end()
          }
        } else {
          res.status(400).end()
        }
      })
    } else {
      res.status(400).end()
    }
  })
})

// GET /api/player/playerId/regret/saleId
router.put('/:playerId/regret/:saleId', security.secured, (req, res) => {
  models.Player.findById(parseInt(req.params.playerId))
  .then((player) => {
    if (player) {
      player.getSales({
        where: { id: parseInt(req.params.saleId) },
        include: [
          { model: models.Player },
          { model: models.Ship },
          { model: models.Relic },
          { model: models.Planet }
        ]
      })
      .then((sales) => {
        if (sales.length > 0) {
          var sale = sales[0]
          var queries = []
          if (sale.Ship) {
            player.getShips({
              where: { id: sale.Ship.id }
            })
            .then((ships) => {
              if (ships.length > 0) {
                var ship = ships[0]
                ship.PlayerShip.quantity += sale.quantity
                ship.PlayerShip.save()
                queries.push(player.save())
              } else {
                res.status(400).end()
              }
            })
          } else if (sale.Relic) {
            player.getRelics({
              where: { id: sale.Relic.id }
            })
            .then((relics) => {
              if (relics.length > 0) {
                var relic = relics[0]
                relic.PlayerRelic.quantity += sale.quantity
                relic.PlayerRelic.save()
              } else {
                player.addRelic(sale.Relic, { quantity: 1 })
              }
              queries.push(player.save())
            })
          } else if (sale.Planet) {
            player.addPlanet(sale.Planet)
            queries.push(player.save())
          }
          Promise.all(queries)
          .then((results) => {
            sale.destroy()
            .then((result) => {
              socketio.emit('player', player.id)
              socketio.emit('market')
              res.status(200).end()
            })
          })
          .catch((error) => {
            console.error(error)
            res.status(500).end()
          })
        } else {
          res.status(400).end()
        }
      })
    } else {
      res.status(400).end()
    }
  })
})

// GET /api/player/playerId/relic/relicId
router.post('/:playerId/relic/:relicId', security.secured, (req, res) => {
  models.Player.findById(parseInt(req.params.playerId))
  .then((player) => {
    if (player) {
      player.getRelics({
        where: { id: parseInt(req.params.relicId) }
      })
      .then((relics) => {
        if (relics.length > 0) {
          var relic = relics[0]
          if (relic.PlayerRelic.quantity <= 1) {
            player.removeRelic(relic)
          } else {
            relic.PlayerRelic.quantity--
            relic.PlayerRelic.save()
          }
          // create new planet
          if (relic.planet) {
            models.Planet.create(factory.build())
            .then((planet) => {
              player.addPlanet(planet)
              .then((player) => {
                socketio.emit('player', player.id)
                res.status(200).end()
              })
            })
          }
          // create new moon
          if (relic.moon) {
            player.getPlanets({
              where: { moon: false }
            })
            .then((planets) => {
              if (planets.length > 0) {
                var planet = planets[Math.floor(Math.random() * planets.length)]
                planet.moon = true
                planet.metal = Math.min(planet.metal + 10, 100)
                planet.crystal = Math.min(planet.crystal + 10, 100)
                planet.oil = Math.min(planet.metal + 10, 100)
                planet.size = Math.min(planet.size + 10, 100)
                planet.energy = Math.min(planet.energy + 10, 100)
                planet.influence = Math.min(planet.influence + 10, 100)
                planet.save()
                .then((planet) => {
                  socketio.emit('player', player.id)
                  res.status(200).end()
                })
              } else {
                socketio.emit('player', player.id)
                res.status(400).end()
              }
            })
          }
          // create new station
          if (relic.station) {
            player.getPlanets({
              where: { station: false }
            })
            .then((planets) => {
              if (planets.length > 0) {
                var planet = planets[Math.floor(Math.random() * planets.length)]
                planet.station = true
                planet.metal = Math.min(planet.metal + 10, 100)
                planet.crystal = Math.min(planet.crystal + 10, 100)
                planet.oil = Math.min(planet.metal + 10, 100)
                planet.size = Math.min(planet.size + 10, 100)
                planet.energy = Math.min(planet.energy + 10, 100)
                planet.influence = Math.min(planet.influence + 10, 100)
                planet.save()
                .then((planet) => {
                  socketio.emit('player', player.id)
                  res.status(200).end()
                })
              } else {
                socketio.emit('player', player.id)
                res.status(400).end()
              }
            })
          }
          // main planet
          if (relic.main) {
            player.getPlanets({
              where: { main: false }
            })
            .then((planets) => {
              if (planets.length > 0) {
                var planet = planets[Math.floor(Math.random() * planets.length)]
                planet.main = true
                planet.save()
                .then((planet) => {
                  socketio.emit('player', player.id)
                  res.status(200).end()
                })
              } else {
                socketio.emit('player', player.id)
                res.status(400).end()
              }
            })
          }
          // generate resources
          if (relic.metal > 0 || relic.crystal > 0 || relic.oil > 0 || relic.level > 0) {
            player.metal += Math.floor(Math.random() * relic.metal)
            player.crystal += Math.floor(Math.random() * relic.crystal)
            player.oil += Math.floor(Math.random() * relic.oil)
            player.level += relic.level
            player.save()
            .then((player) => {
              socketio.emit('player', player.id)
              res.status(200).end()
            })
          }
          // generate experience
          if (relic.experience > 0) {
            player.experience += Math.floor(Math.random() * relic.experience)
            if (player.experience / (constants.up * player.level) >= 1) {
              player.level += player.experience / (constants.up * player.level)
              player.experience = player.experience % (constants.up * player.level)
            }
            player.save()
            .then((player) => {
              socketio.emit('player', player.id)
              res.status(200).end()
            })
          }
          // generate level
          if (relic.level > 0) {
            player.level += relic.level
            player.save()
            .then((player) => {
              socketio.emit('player', player.id)
              res.status(200).end()
            })
          }
          // reset skills
          if (relic.reset) {
            player.getSkills()
            .then((skills) => {
              if (skills.length > 0) {
                skills.forEach((skill) => {
                  skill.PlayerSkill.level = 0
                  skill.PlayerSkill.save()
                })
                player.save()
                .then((player) => {
                  socketio.emit('player', player.id)
                  res.status(200).end()
                })
              } else {
                socketio.emit('player', player.id)
                res.status(400).end()
              }
            })
          }
          // create new ships
          if (relic.ship) {
            player.getShips()
            .then((ships) => {
              if (ships && ships.length > 0) {
                ships.forEach((ship) => {
                  ship.PlayerShip.quantity += Math.floor(Math.random() * 100)
                  ship.PlayerShip.save()
                })
              }
              player.save()
              .then((player) => {
                socketio.emit('player', player.id)
                res.status(200).end()
              })
            })
          }
          // create new buildings
          if (relic.building) {
            player.getBuildings()
            .then((buildings) => {
              if (buildings && buildings.length > 0) {
                buildings.forEach((building) => {
                  building.PlayerBuilding.quantity += Math.floor(Math.random() * 100)
                  building.PlayerBuilding.save()
                })
              }
              player.save()
              .then((player) => {
                socketio.emit('player', player.id)
                res.status(200).end()
              })
            })
          }
          // create new towers
          if (relic.tower) {
            player.getTowers()
            .then((towers) => {
              if (towers && towers.length > 0) {
                towers.forEach((tower) => {
                  tower.PlayerTower.quantity += Math.floor(Math.random() * 100)
                  tower.PlayerTower.save()
                })
              }
              player.save()
              .then((player) => {
                socketio.emit('player', player.id)
                res.status(200).end()
              })
            })
          }
        } else {
          res.status(400).end()
        }
      })
    } else {
      res.status(400).end()
    }
  })
})

// GET /api/player/playerId/faction/factionId
router.put('/:playerId/faction/:factionId', security.secured, (req, res) => {
  models.Player.findById(parseInt(req.params.playerId))
  .then((player) => {
    if (player) {
      models.Faction.findById(parseInt(req.params.factionId))
      .then((faction) => {
        if (faction) {
          if (faction.aether <= player.aether) {
            player.aether -= faction.aether
            player.setFaction(faction)
            player.save()
            .then((player) => {
              socketio.emit('player', player.id)
              res.status(200).end()
            })
          } else {
            res.status(400).end()
          }
        } else {
          res.status(400).end()
        }
      })
    } else {
      res.status(400).end()
    }
  })
})

// GET /api/player/playerId/referendum/referendumId
router.put('/:playerId/referendum/:referendumId', security.secured, (req, res) => {
  models.Player.findById(parseInt(req.params.playerId))
  .then((player) => {
    if (player) {
      models.Referendum.findById(parseInt(req.params.referendumId))
      .then((referendum) => {
        if (referendum) {
          if (referendum.aether <= player.aether) {
            player.aether -= referendum.aether
            player.save()
            .then((player) => {
              player.getPlanets()
              .then((planets) => {
                var influence = planets.reduce((total, planet) => total + planet.influence, 0)
                referendum.votes += influence
                referendum.save()
                .then((referendum) => {
                  socketio.emit('senate')
                  socketio.emit('player', player.id)
                  res.status(200).end()
                })
              })
            })
          } else {
            res.status(400).end()
          }
        } else {
          res.status(400).end()
        }
      })
    } else {
      res.status(400).end()
    }
  })
})

// GET /api/player/playerId/ship/shipId/quantity/quantity
router.put('/:playerId/ship/:shipId/quantity/:quantity', security.secured, (req, res) => {
  models.Player.findById(parseInt(req.params.playerId))
  .then((player) => {
    if (player) {
      player.getShips({
        where: { id: parseInt(req.params.shipId) }
      })
      .then((ships) => {
        if (ships.length > 0) {
          var ship = ships[0]
          var quantity = parseInt(req.params.quantity)
          if (ship.metal * quantity <= player.metal && ship.crystal * quantity <= player.crystal && ship.oil * quantity <= player.oil) {
            player.metal -= ship.metal * quantity
            player.crystal -= ship.crystal * quantity
            player.oil -= ship.oil * quantity
            ship.PlayerShip.quantity += quantity
            ship.PlayerShip.save()
            player.save()
            .then((player) => {
              socketio.emit('player', player.id)
              res.status(200).end()
            })
          } else {
            res.status(400).end()
          }
        } else {
          res.status(400).end()
        }
      })
    } else {
      res.status(400).end()
    }
  })
})

// GET /api/player/playerId/building/buildingId/quantity/quantity
router.put('/:playerId/building/:buildingId/quantity/:quantity', security.secured, (req, res) => {
  models.Player.findById(parseInt(req.params.playerId))
  .then((player) => {
    if (player) {
      player.getBuildings({
        where: { id: parseInt(req.params.buildingId) }
      })
      .then((buildings) => {
        if (buildings.length > 0) {
          var building = buildings[0]
          var quantity = parseInt(req.params.quantity)
          if (building.metal * quantity <= player.metal && building.crystal * quantity <= player.crystal && building.oil * quantity <= player.oil) {
            player.metal -= building.metal * quantity
            player.crystal -= building.crystal * quantity
            player.oil -= building.oil * quantity
            building.PlayerBuilding.quantity += quantity
            building.PlayerBuilding.save()
            player.save()
            .then((player) => {
              socketio.emit('player', player.id)
              res.status(200).end()
            })
          } else {
            res.status(400).end()
          }
        } else {
          res.status(400).end()
        }
      })
    } else {
      res.status(400).end()
    }
  })
})

// GET /api/player/playerId/tower/towerId/quantity/quantity
router.put('/:playerId/tower/:towerId/quantity/:quantity', security.secured, (req, res) => {
  models.Player.findById(parseInt(req.params.playerId))
  .then((player) => {
    if (player) {
      player.getTowers({
        where: { id: parseInt(req.params.towerId) }
      })
      .then((towers) => {
        if (towers.length > 0) {
          var tower = towers[0]
          var quantity = parseInt(req.params.quantity)
          if (tower.metal * quantity <= player.metal && tower.crystal * quantity <= player.crystal && tower.oil * quantity <= player.oil) {
            player.metal -= tower.metal * quantity
            player.crystal -= tower.crystal * quantity
            player.oil -= tower.oil * quantity
            tower.PlayerTower.quantity += quantity
            tower.PlayerTower.save()
            player.save()
            .then((player) => {
              socketio.emit('player', player.id)
              res.status(200).end()
            })
          } else {
            res.status(400).end()
          }
        } else {
          res.status(400).end()
        }
      })
    } else {
      res.status(400).end()
    }
  })
})

// POST /api/player/playerId/message
router.post('/:playerId/message', security.secured, (req, res) => {
  models.Player.findById(parseInt(req.params.playerId))
  .then((sender) => {
    if (sender) {
      models.Player.findById(parseInt(req.body.to))
      .then((receiver) => {
        var message = {
          FromId: sender.id,
          ToId: receiver.id,
          subject: req.body.subject,
          text: req.body.text
        }
        models.Message.create(message)
        .then((message) => {
          socketio.emit('player', sender.id)
          socketio.emit('player', receiver.id)
          res.status(200).end()
        })
      })
    } else {
      res.status(400).end()
    }
  })
})

// DELETE /api/player/playerId/message
router.delete('/:playerId/message/:messageId', security.secured, (req, res) => {
  models.Player.findById(parseInt(req.params.playerId))
  .then((player) => {
    if (player) {
      models.Player.getMessages({
        where: { id: parseInt(req.params.messageId) }
      })
      .then((message) => {
        player.removeMessage(message)
        .then((player) => {
          socketio.emit('player', player.id)
          res.status(200).end()
        })
      })
    } else {
      res.status(400).end()
    }
  })
})

// POST /api/player/playerId/sale/ship
router.post('/:playerId/sale/ship', security.secured, (req, res) => {
  models.Player.findById(parseInt(req.params.playerId))
  .then((player) => {
    if (player) {
      player.getShips({
        where: { id: parseInt(req.body.shipId) }
      })
      .then((ships) => {
        if (ships.length > 0) {
          var ship = ships[0]
          var quantity = parseInt(req.body.quantity)
          var metal = parseInt(req.body.metal)
          var crystal = parseInt(req.body.crystal)
          var oil = parseInt(req.body.oil)
          var aether = parseInt(req.body.aether)
          if ((quantity <= ship.PlayerShip.quantity) && (metal > 0 || crystal > 0 || oil > 0 || aether > 0)) {
            ship.PlayerShip.quantity -= quantity
            ship.PlayerShip.save()
            player.save()
            models.Sale.create({
              quantity: quantity,
              metal: metal,
              crystal: crystal,
              oil: oil,
              aether: aether,
              ShipId: ship.id,
              PlayerId: player.id
            })
            .then((sale) => {
              socketio.emit('player', player.id)
              socketio.emit('market')
              res.status(200).end()
            })
          } else {
            res.status(400).end()
          }
        }
      })
    } else {
      res.status(400).end()
    }
  })
})

// POST /api/player/playerId/sale/relic
router.post('/:playerId/sale/relic', security.secured, (req, res) => {
  models.Player.findById(parseInt(req.params.playerId))
  .then((player) => {
    if (player) {
      player.getRelics({
        where: { id: parseInt(req.body.relicId) }
      })
      .then((relics) => {
        if (relics.length > 0) {
          var relic = relics[0]
          var quantity = parseInt(req.body.quantity)
          var metal = parseInt(req.body.metal)
          var crystal = parseInt(req.body.crystal)
          var oil = parseInt(req.body.oil)
          var aether = parseInt(req.body.aether)
          if ((quantity <= relic.PlayerRelic.quantity) && (metal > 0 || crystal > 0 || oil > 0 || aether > 0)) {
            relic.PlayerRelic.quantity -= quantity
            relic.PlayerRelic.save()
            if (relic.PlayerRelic.quantity <= 0) {
              player.removeRelic(relic)
              player.save()
            }
            models.Sale.create({
              quantity: quantity,
              metal: metal,
              crystal: crystal,
              oil: oil,
              aether: aether,
              RelicId: relic.id,
              PlayerId: player.id
            })
            .then((sale) => {
              socketio.emit('player', player.id)
              socketio.emit('market')
              res.status(200).end()
            })
          } else {
            res.status(400).end()
          }
        }
      })
    } else {
      res.status(400).end()
    }
  })
})

// POST /api/player/playerId/sale/planet
router.post('/:playerId/sale/planet', security.secured, (req, res) => {
  models.Player.findById(parseInt(req.params.playerId))
  .then((player) => {
    if (player) {
      player.getPlanets({
        where: { id: parseInt(req.body.planetId) }
      })
      .then((planets) => {
        if (planets.length > 0) {
          var planet = planets[0]
          var metal = parseInt(req.body.metal)
          var crystal = parseInt(req.body.crystal)
          var oil = parseInt(req.body.oil)
          var aether = parseInt(req.body.aether)
          if (metal > 0 || crystal > 0 || oil > 0 || aether > 0) {
            models.Sale.create({
              quantity: 0,
              metal: metal,
              crystal: crystal,
              oil: oil,
              aether: aether,
              PlanetId: planet.id,
              PlayerId: player.id
            })
            .then((sale) => {
              socketio.emit('player', player.id)
              socketio.emit('market')
              res.status(200).end()
            })
          } else {
            res.status(400).end()
          }
        }
      })
    } else {
      res.status(400).end()
    }
  })
})

// PUT /api/player/playerId/tree
router.put('/:playerId/tree', security.secured, (req, res) => {
  models.Player.findById(parseInt(req.params.playerId))
  .then((player) => {
    if (player) {
      player.getSkills()
      .then((skills) => {
        if (skills.length > 0 && req.body.tree.length > 0) {
          var tree = req.body.tree
          var list = []
          list = list.concat(tree[0].Skills, tree[1].Skills, tree[2].Skills)
          skills.forEach((skill) => {
            skill.PlayerSkill.level = list.find((item) => item.id === skill.id).PlayerSkill.level
            skill.PlayerSkill.save()
          })
          player.save()
          .then((player) => {
            socketio.emit('player', player.id)
            res.status(200).end()
          })
        }
      })
    } else {
      res.status(400).end()
    }
  })
})

module.exports = router

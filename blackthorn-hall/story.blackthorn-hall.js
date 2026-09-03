/* ============================================================
   NEBBIE SU BLACKTHORN HALL — STORIA COMPLETA (TUTTI GLI ATTI)
   ------------------------------------------------------------
   Un solo file, una sola sessione di gioco continua. Gli
   identificatori sono prefissati per atto (act1_/act2_/act3_/...)
   solo per evitare collisioni di nome tra atti scritti in tempi
   diversi — nessun significato speciale per il motore.

   I nuovi atti si aggiungono direttamente qui.
   ============================================================ */

const STORY = {
    meta: {
        "id": "blackthorn-hall",
        "title": "Nebbie su Blackthorn Hall",
        "version": "0.2-atto1-2"
    },

    startNode: "act1_intro_letter",

    initialState: {
        "flags": {
            "hasLamp": false,
            "hasRevolver": false,
            "knowsLayout": false,
            "talkedToAgnes": false,
            "pembertonWarmedUp": false,
            "noticedTremor": false,
            "noticedJoshiahEyes": false,
            "sawSilhouette": false,
            "waitedTillDawn": false,
            "metConstance": false,
            "knowsFamilyHistory": false,
            "deskExamined": false,
            "edmundConfessedPartial": false,
            "hasWestWingKey": false,
            "sawErasedGraves": false,
            "readInscription": false,
            "pickAttempted": false,
            "scoutedGrounds": false,
            "enteredLab": false,
            "readSecondDiary": false,
            "chestOpened": false,
            "edmundFullConfession": false,
            "edmundDenialPath": false,
            "witnessedConstanceCrisis": false,
            "knowsTonightIsNight": false,
            "constanceMissing": false,
            "searchedGroundsFirst": false,
            "confrontedEdmundFirst": false,
            "preparedAtChapelFirst": false,
            "edmundWentTogether": false,
            "askedMessenger": false,
            "recalledUniversity": false,
            "askedAboutFather": false,
            "examinedRoom": false,
            "examinedWestWingDoor": false,
            "examinedOldBooks": false,
            "hadPrivateMomentAct2": false,
            "readNewspaper": false,
            "examinedStatueDaylight": false,
            "examinedGreenhouse": false,
            "examinedStudy": false,
            "noticedEmptySeat": false,
            "noticedStaffUnease": false,
            "hadPrivateMomentEdmund": false,
            "examinedCircle": false,
            "examinedApparatus": false,
            "inscriptionAttempted": false
        },
        "stats": {
            "fiducia": 5,
            "nervi": 10,
            "indagine": 3
        },
        "inventory": [
            {
                "id": "borsa_medica",
                "name": "Borsa medica",
                "desc": "Gli strumenti del mestiere: non si sa mai.",
                "examine": "Ferri chirurgici, bende pulite, una boccetta di laudano. La borsa di un medico di provincia — sufficiente per le emergenze comuni, non certo per ciò che Arthur sta per trovare."
            }
        ]
    },

    music: {
        "act1_home": {
            "wave": "triangle",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 293.66,
                    "dur": 0.9
                },
                {
                    "freq": 369.99,
                    "dur": 0.9
                },
                {
                    "freq": 440,
                    "dur": 0.9
                },
                {
                    "freq": 392,
                    "dur": 1.1
                }
            ]
        },
        "act1_journey": {
            "wave": "sine",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 196,
                    "dur": 0.45
                },
                {
                    "freq": 246.94,
                    "dur": 0.45
                },
                {
                    "freq": 293.66,
                    "dur": 0.45
                },
                {
                    "freq": 261.63,
                    "dur": 0.5
                }
            ]
        },
        "act1_arrival": {
            "wave": "triangle",
            "volume": 0.022,
            "notes": [
                {
                    "freq": 110,
                    "dur": 1.2
                },
                {
                    "freq": 130.81,
                    "dur": 1.2
                },
                {
                    "freq": 155.56,
                    "dur": 1.2
                },
                {
                    "freq": 146.83,
                    "dur": 1.4
                }
            ]
        },
        "act1_house_day": {
            "wave": "square",
            "volume": 0.015,
            "notes": [
                {
                    "freq": 164.81,
                    "dur": 0.55
                },
                {
                    "freq": 196,
                    "dur": 0.55
                },
                {
                    "freq": 233.08,
                    "dur": 0.55
                },
                {
                    "freq": 220,
                    "dur": 0.7
                }
            ]
        },
        "act1_night": {
            "wave": "sine",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 92.5,
                    "dur": 1.5
                },
                {
                    "freq": 130.81,
                    "dur": 1.5
                },
                {
                    "freq": 155.56,
                    "dur": 1.5
                },
                {
                    "freq": 146.83,
                    "dur": 1.8
                }
            ]
        },
        "act1_library": {
            "wave": "sine",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 220,
                    "dur": 0.6
                },
                {
                    "freq": 261.63,
                    "dur": 0.6
                },
                {
                    "freq": 329.63,
                    "dur": 0.6
                },
                {
                    "freq": 293.66,
                    "dur": 0.8
                }
            ]
        },
        "act1_danger": {
            "wave": "sawtooth",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 98,
                    "dur": 0.25
                },
                {
                    "freq": 103.83,
                    "dur": 0.25
                },
                {
                    "freq": 98,
                    "dur": 0.25
                },
                {
                    "freq": 87.31,
                    "dur": 0.4
                }
            ]
        },
        "act1_ending_death": {
            "wave": "sawtooth",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 146.83,
                    "dur": 0.9
                },
                {
                    "freq": 130.81,
                    "dur": 0.9
                },
                {
                    "freq": 116.54,
                    "dur": 0.9
                },
                {
                    "freq": 110,
                    "dur": 1.4
                }
            ]
        },
        "act1_ending_dawn": {
            "wave": "triangle",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 174.61,
                    "dur": 0.8
                },
                {
                    "freq": 220,
                    "dur": 0.8
                },
                {
                    "freq": 261.63,
                    "dur": 0.8
                },
                {
                    "freq": 233.08,
                    "dur": 1
                }
            ]
        },
        "act2_morning": {
            "wave": "triangle",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 261.63,
                    "dur": 0.8
                },
                {
                    "freq": 329.63,
                    "dur": 0.8
                },
                {
                    "freq": 392,
                    "dur": 0.8
                },
                {
                    "freq": 349.23,
                    "dur": 1
                }
            ]
        },
        "act2_grounds": {
            "wave": "sine",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 220,
                    "dur": 0.6
                },
                {
                    "freq": 246.94,
                    "dur": 0.6
                },
                {
                    "freq": 293.66,
                    "dur": 0.6
                },
                {
                    "freq": 261.63,
                    "dur": 0.7
                }
            ]
        },
        "act2_crypt": {
            "wave": "sine",
            "volume": 0.022,
            "notes": [
                {
                    "freq": 87.31,
                    "dur": 1.6
                },
                {
                    "freq": 103.83,
                    "dur": 1.6
                },
                {
                    "freq": 116.54,
                    "dur": 1.6
                },
                {
                    "freq": 98,
                    "dur": 1.9
                }
            ]
        },
        "act2_danger": {
            "wave": "sawtooth",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 100,
                    "dur": 0.25
                },
                {
                    "freq": 106,
                    "dur": 0.25
                },
                {
                    "freq": 100,
                    "dur": 0.25
                },
                {
                    "freq": 88,
                    "dur": 0.4
                }
            ]
        },
        "act2_ending_death": {
            "wave": "sawtooth",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 155.56,
                    "dur": 0.9
                },
                {
                    "freq": 138.59,
                    "dur": 0.9
                },
                {
                    "freq": 116.54,
                    "dur": 0.9
                },
                {
                    "freq": 98,
                    "dur": 1.4
                }
            ]
        },
        "act2_threshold": {
            "wave": "sine",
            "volume": 0.022,
            "notes": [
                {
                    "freq": 146.83,
                    "dur": 1.2
                },
                {
                    "freq": 174.61,
                    "dur": 1.2
                },
                {
                    "freq": 130.81,
                    "dur": 1.2
                },
                {
                    "freq": 116.54,
                    "dur": 1.6
                }
            ]
        },
        "act3_westwing": {
            "wave": "sine",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 73.42,
                    "dur": 1.8
                },
                {
                    "freq": 82.41,
                    "dur": 1.8
                },
                {
                    "freq": 69.3,
                    "dur": 1.8
                },
                {
                    "freq": 77.78,
                    "dur": 2.2
                }
            ]
        },
        "act3_lab": {
            "wave": "sawtooth",
            "volume": 0.016,
            "notes": [
                {
                    "freq": 110,
                    "dur": 1.2
                },
                {
                    "freq": 116.54,
                    "dur": 1.2
                },
                {
                    "freq": 103.83,
                    "dur": 1.2
                },
                {
                    "freq": 98,
                    "dur": 1.5
                }
            ]
        },
        "act3_danger": {
            "wave": "sawtooth",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 105,
                    "dur": 0.22
                },
                {
                    "freq": 112,
                    "dur": 0.22
                },
                {
                    "freq": 105,
                    "dur": 0.22
                },
                {
                    "freq": 90,
                    "dur": 0.35
                }
            ]
        },
        "act3_ending_death": {
            "wave": "sawtooth",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 164.81,
                    "dur": 0.8
                },
                {
                    "freq": 146.83,
                    "dur": 0.8
                },
                {
                    "freq": 123.47,
                    "dur": 0.8
                },
                {
                    "freq": 103.83,
                    "dur": 1.3
                }
            ]
        },
        "act3_confrontation": {
            "wave": "triangle",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 196,
                    "dur": 1
                },
                {
                    "freq": 174.61,
                    "dur": 1
                },
                {
                    "freq": 220,
                    "dur": 1
                },
                {
                    "freq": 164.81,
                    "dur": 1.3
                }
            ]
        },
        "act3_constance": {
            "wave": "sine",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 293.66,
                    "dur": 1.4
                },
                {
                    "freq": 261.63,
                    "dur": 1.4
                },
                {
                    "freq": 246.94,
                    "dur": 1.4
                },
                {
                    "freq": 220,
                    "dur": 1.8
                }
            ]
        },
        "act3_storm": {
            "wave": "sawtooth",
            "volume": 0.018,
            "notes": [
                {
                    "freq": 65.41,
                    "dur": 0.9
                },
                {
                    "freq": 61.74,
                    "dur": 0.9
                },
                {
                    "freq": 58.27,
                    "dur": 0.9
                },
                {
                    "freq": 55,
                    "dur": 1.4
                }
            ]
        },
        "act4_storm": {
            "wave": "sawtooth",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 55,
                    "dur": 0.7
                },
                {
                    "freq": 58.27,
                    "dur": 0.7
                },
                {
                    "freq": 51.91,
                    "dur": 0.7
                },
                {
                    "freq": 49,
                    "dur": 1
                }
            ]
        },
        "act4_danger": {
            "wave": "sawtooth",
            "volume": 0.022,
            "notes": [
                {
                    "freq": 116.54,
                    "dur": 0.2
                },
                {
                    "freq": 123.47,
                    "dur": 0.2
                },
                {
                    "freq": 116.54,
                    "dur": 0.2
                },
                {
                    "freq": 98,
                    "dur": 0.32
                }
            ]
        },
        "act4_ending_death": {
            "wave": "sawtooth",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 130.81,
                    "dur": 0.7
                },
                {
                    "freq": 116.54,
                    "dur": 0.7
                },
                {
                    "freq": 98,
                    "dur": 0.7
                },
                {
                    "freq": 82.41,
                    "dur": 1.2
                }
            ]
        },
        "act4_climax": {
            "wave": "sine",
            "volume": 0.024,
            "notes": [
                {
                    "freq": 61.74,
                    "dur": 1.6
                },
                {
                    "freq": 69.3,
                    "dur": 1.6
                },
                {
                    "freq": 55,
                    "dur": 1.6
                },
                {
                    "freq": 51.91,
                    "dur": 2
                }
            ]
        },
        "act5_ritual": {
            "wave": "sawtooth",
            "volume": 0.024,
            "notes": [
                {
                    "freq": 82.41,
                    "dur": 0.5
                },
                {
                    "freq": 87.31,
                    "dur": 0.5
                },
                {
                    "freq": 77.78,
                    "dur": 0.5
                },
                {
                    "freq": 69.3,
                    "dur": 0.8
                }
            ]
        },
        "act5_ending_broken": {
            "wave": "triangle",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 174.61,
                    "dur": 1.2
                },
                {
                    "freq": 196,
                    "dur": 1.2
                },
                {
                    "freq": 220,
                    "dur": 1.2
                },
                {
                    "freq": 164.81,
                    "dur": 1.8
                }
            ]
        },
        "act5_ending_flight": {
            "wave": "sawtooth",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 130.81,
                    "dur": 0.35
                },
                {
                    "freq": 138.59,
                    "dur": 0.35
                },
                {
                    "freq": 116.54,
                    "dur": 0.35
                },
                {
                    "freq": 98,
                    "dur": 0.6
                }
            ]
        },
        "act5_ending_custode": {
            "wave": "sine",
            "volume": 0.024,
            "notes": [
                {
                    "freq": 41.2,
                    "dur": 2.2
                },
                {
                    "freq": 43.65,
                    "dur": 2.2
                },
                {
                    "freq": 38.89,
                    "dur": 2.2
                },
                {
                    "freq": 36.71,
                    "dur": 2.8
                }
            ]
        },
        "act5_ending_saved": {
            "wave": "triangle",
            "volume": 0.02,
            "notes": [
                {
                    "freq": 196,
                    "dur": 1
                },
                {
                    "freq": 174.61,
                    "dur": 1
                },
                {
                    "freq": 155.56,
                    "dur": 1
                },
                {
                    "freq": 146.83,
                    "dur": 1.5
                }
            ]
        },
        "act5_ending_sacrifice": {
            "wave": "sine",
            "volume": 0.022,
            "notes": [
                {
                    "freq": 220,
                    "dur": 1.6
                },
                {
                    "freq": 196,
                    "dur": 1.6
                },
                {
                    "freq": 174.61,
                    "dur": 1.6
                },
                {
                    "freq": 130.81,
                    "dur": 2.4
                }
            ]
        }
    },

    sfx: {
        "act1_sigillo_rotto": [
            {
                "freq": 300,
                "dur": 0.04,
                "type": "sawtooth"
            },
            {
                "freq": 180,
                "dur": 0.06,
                "type": "sawtooth"
            }
        ],
        "act1_oggetto": [
            {
                "freq": 660,
                "dur": 0.06
            },
            {
                "freq": 880,
                "dur": 0.1
            }
        ],
        "act1_porta_cigolio": [
            {
                "freq": 220,
                "dur": 0.15,
                "type": "sawtooth"
            },
            {
                "freq": 200,
                "dur": 0.15,
                "type": "sawtooth"
            },
            {
                "freq": 180,
                "dur": 0.2,
                "type": "sawtooth"
            },
            {
                "freq": 210,
                "dur": 0.15,
                "type": "sawtooth"
            }
        ],
        "act1_presagio": [
            {
                "freq": 466,
                "dur": 0.15,
                "type": "triangle"
            },
            {
                "freq": 440,
                "dur": 0.15,
                "type": "triangle"
            },
            {
                "freq": 220,
                "dur": 0.35,
                "type": "triangle"
            }
        ],
        "act1_sussurro": [
            {
                "freq": 300,
                "dur": 0.12,
                "type": "sine",
                "volume": 0.03
            },
            {
                "freq": 260,
                "dur": 0.18,
                "type": "sine",
                "volume": 0.025
            }
        ],
        "act1_cigolio_muro": [
            {
                "freq": 90,
                "dur": 0.1,
                "type": "square"
            },
            {
                "freq": 70,
                "dur": 0.15,
                "type": "square"
            },
            {
                "freq": 90,
                "dur": 0.1,
                "type": "square"
            },
            {
                "freq": 70,
                "dur": 0.2,
                "type": "square"
            }
        ],
        "act1_impatto": [
            {
                "freq": 180,
                "dur": 0.08,
                "type": "sawtooth"
            },
            {
                "freq": 90,
                "dur": 0.12,
                "type": "sawtooth"
            },
            {
                "freq": 50,
                "dur": 0.25,
                "type": "sawtooth"
            }
        ],
        "act1_carta_furtiva": [
            {
                "freq": 900,
                "dur": 0.04,
                "type": "sine",
                "volume": 0.03
            },
            {
                "freq": 1100,
                "dur": 0.05,
                "type": "sine",
                "volume": 0.025
            },
            {
                "freq": 850,
                "dur": 0.04,
                "type": "sine",
                "volume": 0.02
            }
        ],
        "act2_campana": [
            {
                "freq": 440,
                "dur": 0.3,
                "type": "sine"
            },
            {
                "freq": 440,
                "dur": 0.3,
                "type": "sine"
            }
        ],
        "act2_passi_pietra": [
            {
                "freq": 120,
                "dur": 0.08,
                "type": "square"
            },
            {
                "freq": 100,
                "dur": 0.08,
                "type": "square"
            }
        ],
        "act2_chiave_gira": [
            {
                "freq": 300,
                "dur": 0.06,
                "type": "square"
            },
            {
                "freq": 500,
                "dur": 0.08,
                "type": "square"
            },
            {
                "freq": 700,
                "dur": 0.12,
                "type": "square"
            }
        ],
        "act2_lucchetto_forzato": [
            {
                "freq": 250,
                "dur": 0.05,
                "type": "square"
            },
            {
                "freq": 600,
                "dur": 0.1,
                "type": "square"
            }
        ],
        "act2_pergamena": [
            {
                "freq": 800,
                "dur": 0.05,
                "type": "sine",
                "volume": 0.03
            },
            {
                "freq": 700,
                "dur": 0.06,
                "type": "sine",
                "volume": 0.025
            }
        ],
        "act2_oggetto": [
            {
                "freq": 660,
                "dur": 0.06
            },
            {
                "freq": 880,
                "dur": 0.1
            }
        ],
        "act2_impatto": [
            {
                "freq": 180,
                "dur": 0.08,
                "type": "sawtooth"
            },
            {
                "freq": 90,
                "dur": 0.12,
                "type": "sawtooth"
            },
            {
                "freq": 50,
                "dur": 0.25,
                "type": "sawtooth"
            }
        ],
        "act3_pergamena": [
            {
                "freq": 800,
                "dur": 0.05,
                "type": "sine",
                "volume": 0.03
            },
            {
                "freq": 700,
                "dur": 0.06,
                "type": "sine",
                "volume": 0.025
            }
        ],
        "act3_meccanismo": [
            {
                "freq": 300,
                "dur": 0.08,
                "type": "square"
            },
            {
                "freq": 350,
                "dur": 0.08,
                "type": "square"
            },
            {
                "freq": 400,
                "dur": 0.1,
                "type": "square"
            }
        ],
        "act3_trappola": [
            {
                "freq": 900,
                "dur": 0.05,
                "type": "sawtooth"
            },
            {
                "freq": 200,
                "dur": 0.15,
                "type": "sawtooth"
            },
            {
                "freq": 80,
                "dur": 0.3,
                "type": "sawtooth"
            }
        ],
        "act3_tuono": [
            {
                "freq": 60,
                "dur": 0.4,
                "type": "sawtooth"
            },
            {
                "freq": 45,
                "dur": 0.6,
                "type": "sawtooth"
            }
        ],
        "act3_rivelazione": [
            {
                "freq": 220,
                "dur": 0.2,
                "type": "triangle"
            },
            {
                "freq": 277.18,
                "dur": 0.2,
                "type": "triangle"
            },
            {
                "freq": 329.63,
                "dur": 0.35,
                "type": "triangle"
            }
        ],
        "act4_tuono": [
            {
                "freq": 55,
                "dur": 0.4,
                "type": "sawtooth"
            },
            {
                "freq": 40,
                "dur": 0.6,
                "type": "sawtooth"
            }
        ],
        "act4_vetro_rotto": [
            {
                "freq": 1200,
                "dur": 0.04,
                "type": "square"
            },
            {
                "freq": 900,
                "dur": 0.05,
                "type": "square"
            },
            {
                "freq": 600,
                "dur": 0.06,
                "type": "square"
            }
        ],
        "act4_acqua_impetuosa": [
            {
                "freq": 200,
                "dur": 0.15,
                "type": "sawtooth",
                "volume": 0.03
            },
            {
                "freq": 150,
                "dur": 0.2,
                "type": "sawtooth",
                "volume": 0.025
            }
        ],
        "act4_annegamento": [
            {
                "freq": 180,
                "dur": 0.1,
                "type": "sawtooth"
            },
            {
                "freq": 100,
                "dur": 0.2,
                "type": "sawtooth"
            },
            {
                "freq": 40,
                "dur": 0.4,
                "type": "sawtooth"
            }
        ],
        "act4_passi_corsa": [
            {
                "freq": 140,
                "dur": 0.06,
                "type": "square"
            },
            {
                "freq": 120,
                "dur": 0.06,
                "type": "square"
            }
        ],
        "act5_presenza": [
            {
                "freq": 45,
                "dur": 0.6,
                "type": "sine",
                "volume": 0.035
            },
            {
                "freq": 50,
                "dur": 0.8,
                "type": "sine",
                "volume": 0.03
            }
        ],
        "act5_rottura": [
            {
                "freq": 700,
                "dur": 0.06,
                "type": "square"
            },
            {
                "freq": 300,
                "dur": 0.1,
                "type": "sawtooth"
            },
            {
                "freq": 150,
                "dur": 0.2,
                "type": "sawtooth"
            }
        ],
        "act5_respiro": [
            {
                "freq": 300,
                "dur": 0.3,
                "type": "sine",
                "volume": 0.025
            },
            {
                "freq": 250,
                "dur": 0.4,
                "type": "sine",
                "volume": 0.02
            }
        ],
        "act5_campana_finale": [
            {
                "freq": 220,
                "dur": 0.6,
                "type": "sine"
            },
            {
                "freq": 220,
                "dur": 0.6,
                "type": "sine"
            },
            {
                "freq": 220,
                "dur": 1,
                "type": "sine"
            }
        ],
        "act5_urlo_lontano": [
            {
                "freq": 500,
                "dur": 0.15,
                "type": "sawtooth"
            },
            {
                "freq": 350,
                "dur": 0.2,
                "type": "sawtooth"
            }
        ]
    },

    nodes: {
        "act1_intro_letter": {
            "location": "STUDIO DEL DOTTOR WREN — ALDERBROOK",
            "music": "act1_home",
            "art": "<svg viewBox=\"0 0 300 140\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"var(--color-main)\" fill=\"none\" stroke-width=\"2\">\n                <rect x=\"70\" y=\"55\" width=\"160\" height=\"75\" />\n                <path d=\"M70,55 L150,105 L230,55\" />\n                <rect x=\"95\" y=\"18\" width=\"110\" height=\"55\" fill=\"var(--color-bg)\" />\n                <line x1=\"105\" y1=\"33\" x2=\"185\" y2=\"33\" />\n                <line x1=\"105\" y1=\"43\" x2=\"185\" y2=\"43\" />\n                <line x1=\"105\" y1=\"53\" x2=\"160\" y2=\"53\" />\n                <circle cx=\"150\" cy=\"92\" r=\"12\" />\n                <line x1=\"245\" y1=\"28\" x2=\"270\" y2=\"88\" />\n                <path d=\"M245,28 Q233,18 250,8\" />\n            </svg>",
            "text": "La sera è già scesa quando il messaggero bussa. Arthur Wren posa la penna, i registri dei pazienti ancora aperti sulla scrivania, e riceve una busta sporca di fango di strada.\n\nLa calligrafia sulla busta è quella di Edmund Ashcombe — ma tremante, affrettata, così diversa dalla mano ordinata che ricordava dai tempi dell'università. Arthur rompe il sigillo.\n\nLe righe sono poche, scritte di fretta: parlano di rumori nella notte, della salute di Constance che peggiora, e di un 'vieni prima che sia troppo tardi' senza altra spiegazione. Non è da Edmund, scrivere così.",
            "onArrive": [
                {
                    "type": "playSfx",
                    "sfx": "act1_sigillo_rotto"
                },
                {
                    "type": "addItem",
                    "id": "lettera_edmund",
                    "name": "Lettera di Edmund",
                    "desc": "Poche righe frettolose, macchiate d'inchiostro.",
                    "examine": "'Arthur — perdonami la fretta, ma non ho tempo da perdere in cortesie. Le cose qui a Blackthorn Hall non vanno. Constance non sta bene, i medici del paese non sanno che pesci pigliare, o forse hanno troppa paura per dirlo apertamente. Ci sono rumori, la notte. Nei muri. Non oso scrivere altro su questa carta. Vieni, ti prego, e vieni presto — vieni prima che sia troppo tardi. Il tuo E.A.'\n\nRileggendola con più calma, noti che l'inchiostro trema visibilmente verso la fine, come se la mano di chi scriveva avesse esitato — o avesse sentito qualcosa.",
                    "examineEffects": [
                        {
                            "type": "setFlag",
                            "flag": "noticedTremor",
                            "value": true
                        },
                        {
                            "type": "modifyStat",
                            "stat": "indagine",
                            "delta": 1
                        }
                    ]
                },
                {
                    "type": "addLog",
                    "title": "LA LETTERA DI EDMUND",
                    "entry": "Edmund Ashcombe scrive da Blackthorn Hall: rumori notturni, la salute di Constance in declino. 'Vieni prima che sia troppo tardi.'"
                }
            ],
            "options": [
                {
                    "text": "> Chiedi al messaggero se sa qualcosa di più",
                    "target": "act1_messenger_query",
                    "condition": {
                        "type": "flag",
                        "flag": "askedMessenger",
                        "equals": false
                    }
                },
                {
                    "text": "> Chiedi al messaggero se sa qualcosa di più",
                    "target": "act1_messenger_query_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "askedMessenger"
                    }
                },
                {
                    "text": "> Guarda ancora un momento lo studio, prima di partire",
                    "target": "act1_study_details",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedStudy",
                        "equals": false
                    }
                },
                {
                    "text": "> Guarda ancora un momento lo studio, prima di partire",
                    "target": "act1_study_details_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedStudy"
                    }
                },
                {
                    "text": "> Ripensa a come conobbe Edmund, tanti anni fa",
                    "target": "act1_university_memories",
                    "condition": {
                        "type": "flag",
                        "flag": "recalledUniversity",
                        "equals": false
                    }
                },
                {
                    "text": "> Ripensa a come conobbe Edmund, tanti anni fa",
                    "target": "act1_university_memories_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "recalledUniversity"
                    }
                },
                {
                    "text": "> Non c'è tempo da perdere: prepara i bagagli",
                    "target": "act1_packing"
                }
            ]
        },
        "act1_study_details": {
            "location": "STUDIO DEL DOTTOR WREN",
            "text": "Lo studio è piccolo ma ordinato: scaffali di testi di medicina, un microscopio ereditato dal suo maestro a Edimburgo, e sulla scrivania una fotografia in una cornice d'argento — Eleanor, sua moglie, morta di febbre puerperale quasi sei anni fa insieme al bambino che portava in grembo. Da allora Arthur ha riempito ogni ora vuota con il lavoro, i pazienti, i libri. Non ha più avuto, in fondo, una vera ragione per restare fermo in un posto — né per lasciarlo, finché qualcuno come Edmund non gliene desse motivo.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "ELEANOR",
                    "entry": "Sua moglie Eleanor è morta quasi sei anni fa. Da allora, il lavoro ha riempito il vuoto."
                }
            ],
            "options": [
                {
                    "text": "> Chiedi al messaggero se sa qualcosa di più",
                    "target": "act1_messenger_query",
                    "condition": {
                        "type": "flag",
                        "flag": "askedMessenger",
                        "equals": false
                    }
                },
                {
                    "text": "> Chiedi al messaggero se sa qualcosa di più",
                    "target": "act1_messenger_query_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "askedMessenger"
                    }
                },
                {
                    "text": "> Ripensa a come conobbe Edmund, tanti anni fa",
                    "target": "act1_university_memories",
                    "condition": {
                        "type": "flag",
                        "flag": "recalledUniversity",
                        "equals": false
                    }
                },
                {
                    "text": "> Ripensa a come conobbe Edmund, tanti anni fa",
                    "target": "act1_university_memories_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "recalledUniversity"
                    }
                },
                {
                    "text": "> Non c'è tempo da perdere: prepara i bagagli",
                    "target": "act1_packing"
                }
            ],
            "onArriveOnce": [
                {
                    "type": "setFlag",
                    "flag": "examinedStudy",
                    "value": true
                }
            ]
        },
        "act1_university_memories": {
            "location": "STUDIO DEL DOTTOR WREN",
            "text": "Cambridge, quindici anni prima: Arthur, figlio di un medico di provincia, e Edmund, erede di una delle famiglie più antiche della contea, si erano ritrovati compagni di stanza per puro capriccio dell'amministrazione universitaria. Non sarebbe dovuta funzionare, quell'amicizia — troppo diversi per censo, per temperamento — eppure Edmund era stato l'unico, tra tutti i rampolli di buona famiglia, a trattarlo mai come un pari e mai come un progetto di carità. Gli deve, se non altro, questo viaggio.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "L'AMICIZIA CON EDMUND",
                    "entry": "Compagni di stanza a Cambridge, quindici anni fa. Edmund fu l'unico a trattarlo sempre da pari."
                }
            ],
            "options": [
                {
                    "text": "> Chiedi al messaggero se sa qualcosa di più",
                    "target": "act1_messenger_query",
                    "condition": {
                        "type": "flag",
                        "flag": "askedMessenger",
                        "equals": false
                    }
                },
                {
                    "text": "> Chiedi al messaggero se sa qualcosa di più",
                    "target": "act1_messenger_query_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "askedMessenger"
                    }
                },
                {
                    "text": "> Guarda ancora un momento lo studio, prima di partire",
                    "target": "act1_study_details",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedStudy",
                        "equals": false
                    }
                },
                {
                    "text": "> Guarda ancora un momento lo studio, prima di partire",
                    "target": "act1_study_details_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedStudy"
                    }
                },
                {
                    "text": "> Non c'è tempo da perdere: prepara i bagagli",
                    "target": "act1_packing"
                }
            ],
            "onArriveOnce": [
                {
                    "type": "setFlag",
                    "flag": "recalledUniversity",
                    "value": true
                },
                {
                    "type": "setFlag",
                    "flag": "recalledUniversity",
                    "value": true
                }
            ]
        },
        "act1_messenger_query": {
            "location": "STUDIO DEL DOTTOR WREN",
            "text": "Il messaggero, un ragazzo del villaggio vicino ad Alderbrook, si stringe nelle spalle. 'So solo che m'hanno pagato per portarla in fretta, signore. Ma laggiù, a Blackthorn Hall...' esita, poi scuote la testa. 'La gente non ci va più volentieri, ecco tutto. Da quando il vecchio Lord è morto, dicono che quella casa non sia più la stessa.' Non aggiunge altro, e non sembra intenzionato a farlo.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "VOCI SU ALDERBROOK",
                    "entry": "Il messaggero conferma solo che la gente del posto evita Blackthorn Hall 'da quando il vecchio Lord è morto'."
                }
            ],
            "onArriveOnce": [
                {
                    "type": "modifyStat",
                    "stat": "indagine",
                    "delta": 1
                },
                {
                    "type": "setFlag",
                    "flag": "askedMessenger",
                    "value": true
                },
                {
                    "type": "setFlag",
                    "flag": "askedMessenger",
                    "value": true
                }
            ],
            "options": [
                {
                    "text": "> Guarda ancora un momento lo studio, prima di partire",
                    "target": "act1_study_details",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedStudy",
                        "equals": false
                    }
                },
                {
                    "text": "> Guarda ancora un momento lo studio, prima di partire",
                    "target": "act1_study_details_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedStudy"
                    }
                },
                {
                    "text": "> Ripensa a come conobbe Edmund, tanti anni fa",
                    "target": "act1_university_memories",
                    "condition": {
                        "type": "flag",
                        "flag": "recalledUniversity",
                        "equals": false
                    }
                },
                {
                    "text": "> Ripensa a come conobbe Edmund, tanti anni fa",
                    "target": "act1_university_memories_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "recalledUniversity"
                    }
                },
                {
                    "text": "> Non c'è tempo da perdere: prepara i bagagli",
                    "target": "act1_packing"
                }
            ]
        },
        "act1_packing": {
            "location": "CASA DEL DOTTOR WREN",
            "text": "Mentre prepara la valigia, lo sguardo di Arthur cade sullo sgabuzzino in fondo al corridoio, dove tiene una vecchia lanterna a olio — utile per le visite notturne ai pazienti di campagna, quando i lampioni a gas finiscono ben prima delle strade.",
            "options": [
                {
                    "text": "> Prendi la lanterna a olio",
                    "target": "act1_packing_revolver",
                    "effects": [
                        {
                            "type": "setFlag",
                            "flag": "hasLamp",
                            "value": true
                        },
                        {
                            "type": "addItem",
                            "id": "lanterna",
                            "name": "Lanterna a olio",
                            "desc": "Vecchia ma affidabile.",
                            "examine": "Il vetro è incrinato in un angolo ma la fiamma tiene bene. L'ha portata in decine di case buie, di notte, per parti difficili e febbri improvvise. Non l'ha mai delusa."
                        },
                        {
                            "type": "playSfx",
                            "sfx": "act1_oggetto"
                        }
                    ]
                },
                {
                    "text": "> Lasciala: sarà solo una breve visita a un amico",
                    "target": "act1_packing_revolver"
                }
            ]
        },
        "act1_packing_revolver": {
            "location": "CASA DEL DOTTOR WREN",
            "text": "Nell'ultimo cassetto della scrivania, sotto vecchie carte, la mano di Arthur sfiora il revolver che fu di suo padre. Non l'ha mai portato con sé per una visita, prima d'ora. Ma la lettera di Edmund non è come le altre.",
            "options": [
                {
                    "text": "> Prendi il vecchio revolver di famiglia",
                    "target": "act1_packing_thoughts",
                    "effects": [
                        {
                            "type": "setFlag",
                            "flag": "hasRevolver",
                            "value": true
                        },
                        {
                            "type": "addItem",
                            "id": "revolver",
                            "name": "Revolver di famiglia",
                            "desc": "Appartenuto a suo padre.",
                            "examine": "Un'arma vecchio stile, curata con più affetto che necessità negli anni. Arthur non l'ha mai usata contro nulla di vivo. Spera non gli servirà nemmeno stavolta."
                        },
                        {
                            "type": "playSfx",
                            "sfx": "act1_oggetto"
                        }
                    ]
                },
                {
                    "text": "> Lascialo: è solo una visita a un vecchio amico, non una spedizione",
                    "target": "act1_packing_thoughts"
                }
            ]
        },
        "act1_packing_thoughts": {
            "location": "CASA DEL DOTTOR WREN",
            "text": "Chiude la valigia. Per un istante pensa ai pazienti che dovrà lasciare per qualche giorno, alla routine tranquilla di Alderbrook — poi rilegge mentalmente le parole di Edmund, 'vieni prima che sia troppo tardi', e ogni esitazione svanisce. Al mattino presto è già alla stazione.",
            "options": [
                {
                    "text": "> Parti per Blackthorn Hall",
                    "target": "act1_journey_train"
                }
            ]
        },
        "act1_journey_train": {
            "location": "TRENO PER ALDERBROOK",
            "music": "act1_journey",
            "text": "Il treno lascia presto la città alle spalle. Colline, siepi, villaggi di pietra grigia scorrono fuori dal finestrino, e col passare delle ore la campagna si fa più selvaggia, meno curata. Verso il tardo pomeriggio una nebbia sottile inizia a salire dai campi, anche se il sole non è ancora tramontato — un dettaglio che Arthur, uomo di scienza, si sforza di non trovare inquietante.",
            "options": [
                {
                    "text": "> Un compagno di viaggio attacca discorso",
                    "target": "act1_train_stranger"
                },
                {
                    "text": "> Osserva il paesaggio in silenzio, immerso nei pensieri",
                    "target": "act1_arrival_gates"
                }
            ]
        },
        "act1_train_stranger": {
            "location": "TRENO PER ALDERBROOK",
            "text": "Un uomo anziano seduto di fronte, notando la destinazione scritta sul suo biglietto, inarca un sopracciglio. 'Blackthorn Hall, dice? Vecchia famiglia, gli Ashcombe. Vecchia e...' si interrompe, sceglie le parole con cura, 'particolare. Mio nonno diceva che certe famiglie con troppa terra e troppa storia finiscono per dovere qualcosa a qualcosa, se capisce cosa intendo.' Non capisce, ma qualcosa nel tono dell'uomo gli fa venire la pelle d'oca.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "SUPERSTIZIONI LOCALI",
                    "entry": "Un passeggero allude a un debito antico della famiglia Ashcombe, senza spiegarsi oltre."
                },
                {
                    "type": "modifyStat",
                    "stat": "nervi",
                    "delta": -1
                },
                {
                    "type": "modifyStat",
                    "stat": "indagine",
                    "delta": 1
                }
            ],
            "options": [
                {
                    "text": "> Prosegui verso Blackthorn Hall",
                    "target": "act1_arrival_gates"
                }
            ]
        },
        "act1_arrival_gates": {
            "location": "CANCELLO DI BLACKTHORN HALL",
            "music": "act1_arrival",
            "art": "<svg viewBox=\"0 0 300 160\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"var(--color-main)\" fill=\"none\" stroke-width=\"2\">\n                <path d=\"M90,90 L90,58 L150,18 L210,58 L210,90\" />\n                <rect x=\"105\" y=\"68\" width=\"20\" height=\"22\" />\n                <rect x=\"175\" y=\"68\" width=\"20\" height=\"22\" />\n                <rect x=\"140\" y=\"72\" width=\"20\" height=\"18\" />\n                <path d=\"M40,150 L55,98 L70,150\" />\n                <path d=\"M230,150 L245,93 L260,150\" />\n                <line x1=\"60\" y1=\"158\" x2=\"60\" y2=\"98\" />\n                <line x1=\"240\" y1=\"158\" x2=\"240\" y2=\"98\" />\n                <path d=\"M60,98 Q150,68 240,98\" />\n                <line x1=\"90\" y1=\"158\" x2=\"90\" y2=\"103\" />\n                <line x1=\"120\" y1=\"158\" x2=\"120\" y2=\"98\" />\n                <line x1=\"150\" y1=\"158\" x2=\"150\" y2=\"96\" />\n                <line x1=\"180\" y1=\"158\" x2=\"180\" y2=\"98\" />\n                <line x1=\"210\" y1=\"158\" x2=\"210\" y2=\"103\" />\n            </svg>",
            "text": "La carrozza a noleggio si ferma davanti a un cancello di ferro battuto, arrugginito, semiaperto su un viale che si perde nel verde. Oltre gli alberi, appena visibile nella luce che cala, la sagoma di Blackthorn Hall — enorme, silenziosa, con più finestre buie che illuminate.",
            "onArrive": [
                {
                    "type": "modifyStat",
                    "stat": "nervi",
                    "delta": -1
                }
            ],
            "options": [
                {
                    "text": "> Osserva il giardino incolto prima di entrare",
                    "target": "act1_grounds_garden"
                },
                {
                    "text": "> Attraversa il cancello e avvicinati alla casa",
                    "target": "act1_arrival_pemberton"
                }
            ]
        },
        "act1_grounds_garden": {
            "location": "GIARDINO DI BLACKTHORN HALL",
            "text": "Quello che doveva essere un giardino ordinato è ormai un groviglio di rovi ed erbacce. Una statua — un angelo, forse, o un bambino, è difficile dirlo — giace spezzata a metà tra le foglie morte, il volto eroso dal tempo o forse deliberatamente scalpellato via.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "IL GIARDINO",
                    "entry": "Statua spezzata e volto cancellato nel giardino incolto — nessuno cura questo posto da anni."
                },
                {
                    "type": "modifyStat",
                    "stat": "nervi",
                    "delta": -1
                }
            ],
            "options": [
                {
                    "text": "> Attraversa il cancello e avvicinati alla casa",
                    "target": "act1_arrival_pemberton"
                }
            ]
        },
        "act1_arrival_pemberton": {
            "location": "INGRESSO DI BLACKTHORN HALL",
            "music": "act1_house_day",
            "text": "La porta si apre prima ancora che Arthur bussi. Una donna anziana in nero, la schiena dritta come un fuso, lo osserva con una cortesia troppo formale per essere calorosa. 'Dottor Wren, presumo. Il signor Ashcombe l'aspetta. Sono Mrs. Pemberton — governante di questa casa da prima che il signor Edmund nascesse.' Non aggiunge altro, e si volta per farlo entrare.",
            "options": [
                {
                    "text": "> Prova a fare due chiacchiere con la governante",
                    "target": "act1_pemberton_smalltalk"
                },
                {
                    "text": "> Dai un'occhiata ai ritratti appesi nell'ingresso",
                    "target": "act1_hall_portraits"
                },
                {
                    "text": "> Seguila dentro, verso Edmund",
                    "target": "act1_arrival_edmund"
                }
            ]
        },
        "act1_pemberton_smalltalk": {
            "location": "INGRESSO DI BLACKTHORN HALL",
            "text": "Arthur tenta un commento cortese sul viaggio, sul tempo. Mrs. Pemberton risponde con monosillabi impeccabili e un sorriso che non raggiunge mai gli occhi. È chiaro che con lei la cordialità spicciola non funziona — servirà ben altro, se mai vorrà parlare davvero.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "MRS. PEMBERTON",
                    "entry": "Cortese ma impenetrabile. La cordialità superficiale non basta a farla parlare."
                }
            ],
            "options": [
                {
                    "text": "> Dai un'occhiata ai ritratti appesi nell'ingresso",
                    "target": "act1_hall_portraits"
                },
                {
                    "text": "> Seguila dentro, verso Edmund",
                    "target": "act1_arrival_edmund"
                }
            ]
        },
        "act1_hall_portraits": {
            "location": "INGRESSO DI BLACKTHORN HALL",
            "text": "Una fila di ritratti sorveglia l'ingresso — generazioni di Ashcombe in abiti d'epoca, sguardi severi dipinti a olio. Uno in particolare attira la sua attenzione: un uomo dai lineamenti duri, una targhetta d'ottone alla base che recita 'Lord Josiah Ashcombe, 1791-1856'.",
            "options": [
                {
                    "text": "> Osserva con attenzione il ritratto di Josiah",
                    "target": "act1_arrival_edmund",
                    "skillCheck": {
                        "stat": "indagine",
                        "difficulty": 5,
                        "success": "act1_hall_portraits_notice",
                        "failure": "act1_hall_portraits_nothing"
                    }
                },
                {
                    "text": "> Non c'è tempo per i quadri: raggiungi Edmund",
                    "target": "act1_arrival_edmund"
                }
            ]
        },
        "act1_hall_portraits_notice": {
            "location": "INGRESSO DI BLACKTHORN HALL",
            "text": "Più lo osserva, più Arthur nota un dettaglio strano: qualunque punto dell'ingresso scelga, gli occhi dipinti di Josiah Ashcombe sembrano sempre puntati esattamente su di lui. Sa che è un trucco della prospettiva pittorica, comune in questo tipo di ritratti — eppure non riesce a scrollarsi di dosso la sensazione di essere osservato.",
            "onArrive": [
                {
                    "type": "setFlag",
                    "flag": "noticedJoshiahEyes",
                    "value": true
                },
                {
                    "type": "addLog",
                    "title": "LORD JOSIAH",
                    "entry": "Il ritratto di Josiah Ashcombe (1791-1856) sembra seguire chi si muove nell'ingresso."
                },
                {
                    "type": "playSfx",
                    "sfx": "act1_presagio"
                }
            ],
            "options": [
                {
                    "text": "> Raggiungi Edmund",
                    "target": "act1_arrival_edmund"
                }
            ]
        },
        "act1_hall_portraits_nothing": {
            "location": "INGRESSO DI BLACKTHORN HALL",
            "text": "Un ritratto come tanti altri, si dice — un antenato austero come tutti gli antenati dipinti nei corridoi di famiglia. Non c'è tempo da perdere in fantasie: Edmund lo aspetta.",
            "options": [
                {
                    "text": "> Raggiungi Edmund",
                    "target": "act1_arrival_edmund"
                }
            ]
        },
        "act1_arrival_edmund": {
            "location": "SALOTTO PRINCIPALE",
            "text": "Edmund è in piedi davanti al camino spento, più magro di come Arthur lo ricordava, le occhiaie profonde di chi non dorme da settimane. Quando lo vede, un sollievo genuino gli attraversa il volto — ma dura solo un istante, prima che la cautela riprenda il sopravvento. 'Arthur. Sei venuto.' Non sembra sorpreso quanto grato.",
            "options": [
                {
                    "text": "> Abbraccialo e chiedigli subito cosa sta succedendo",
                    "target": "act1_dinner",
                    "effects": [
                        {
                            "type": "modifyStat",
                            "stat": "fiducia",
                            "delta": 1
                        }
                    ]
                },
                {
                    "text": "> Sii cauto: lascia che sia lui a parlare, quando sarà pronto",
                    "target": "act1_dinner",
                    "effects": [
                        {
                            "type": "modifyStat",
                            "stat": "indagine",
                            "delta": 1
                        }
                    ]
                },
                {
                    "text": "> Chiedigli un momento da solo, lontano da orecchie indiscrete",
                    "target": "act1_edmund_aside"
                }
            ]
        },
        "act1_edmund_aside": {
            "location": "SALOTTO PRINCIPALE",
            "text": "Edmund lancia un'occhiata alla porta, poi abbassa la voce. 'Non qui. Non con Pemberton che gira per casa.' Per un istante sembra sul punto di dire qualcosa di importante — poi scuote la testa. 'Dopo cena. Ti prego, Arthur, abbi pazienza con me. Non è che non mi fidi di te. È che a dirlo ad alta voce... diventa vero.' Il sollievo di avere un amico vicino, però, è visibile sul suo volto.",
            "onArrive": [
                {
                    "type": "modifyStat",
                    "stat": "fiducia",
                    "delta": 1
                },
                {
                    "type": "addLog",
                    "title": "EDMUND TRATTIENE QUALCOSA",
                    "entry": "'A dirlo ad alta voce diventa vero,' dice Edmund. Promette di parlare dopo cena."
                }
            ],
            "options": [
                {
                    "text": "> Rispetta la sua richiesta, per ora",
                    "target": "act1_dinner"
                }
            ]
        },
        "act1_dinner": {
            "location": "SALA DA PRANZO",
            "text": "La cena si consuma in un salone troppo grande per due persone sole, il servizio d'argento che tintinna nel silenzio. Edmund parla di cose superficiali — il raccolto, la ferrovia, vecchi conoscenti comuni — evitando con cura ogni domanda che si avvicini troppo al motivo della lettera. Di Constance, non fa parola.",
            "options": [
                {
                    "text": "> Chiedi apertamente notizie di Constance",
                    "target": "act1_dinner_constance_reaction"
                },
                {
                    "text": "> Lascia correre: è ancora presto per insistere",
                    "target": "act1_retiring"
                },
                {
                    "text": "> Nota il posto apparecchiato ma vuoto in fondo al tavolo",
                    "target": "act1_dinner_empty_seat",
                    "condition": {
                        "type": "flag",
                        "flag": "noticedEmptySeat",
                        "equals": false
                    }
                },
                {
                    "text": "> Nota il posto apparecchiato ma vuoto in fondo al tavolo",
                    "target": "act1_dinner_empty_seat_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "noticedEmptySeat"
                    }
                },
                {
                    "text": "> Osserva i dettagli della sala mentre si parla del più e del meno",
                    "target": "act1_dinner_local_color"
                },
                {
                    "text": "> Chiedi di suo padre, il vecchio Lord Ashcombe",
                    "target": "act1_dinner_father",
                    "condition": {
                        "type": "flag",
                        "flag": "askedAboutFather",
                        "equals": false
                    }
                },
                {
                    "text": "> Chiedi di suo padre, il vecchio Lord Ashcombe",
                    "target": "act1_dinner_father_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "askedAboutFather"
                    }
                },
                {
                    "text": "> Nota quanto sembra nervoso il personale di servizio",
                    "target": "act1_dinner_staff_unease",
                    "condition": {
                        "type": "flag",
                        "flag": "noticedStaffUnease",
                        "equals": false
                    }
                },
                {
                    "text": "> Nota quanto sembra nervoso il personale di servizio",
                    "target": "act1_dinner_staff_unease_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "noticedStaffUnease"
                    }
                }
            ]
        },
        "act1_dinner_father": {
            "location": "SALA DA PRANZO",
            "text": "Alla menzione del padre, qualcosa nello sguardo di Edmund si irrigidisce. 'È morto tre anni fa. Malattia di famiglia, dicono i medici del paese — un lento declino delle facoltà mentali, non diverso da quello che portò via anche nostro nonno, a suo tempo.' Beve un sorso di vino prima di continuare, quasi controvoglia: 'A quanto pare è cosa che si tramanda, negli Ashcombe. Una specie di... maledizione di famiglia, se si crede alle superstizioni di paese. Io preferisco pensare fosse solo malattia.' Il modo in cui lo dice, però, non suona affatto convinto.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "LA 'MALATTIA DI FAMIGLIA'",
                    "entry": "Il padre e il nonno di Edmund sono morti dello stesso 'lento declino mentale'. Lui la chiama malattia. Non sembra crederci del tutto."
                }
            ],
            "options": [
                {
                    "text": "> Torna alla conversazione",
                    "target": "act1_dinner"
                }
            ],
            "onArriveOnce": [
                {
                    "type": "setFlag",
                    "flag": "askedAboutFather",
                    "value": true
                },
                {
                    "type": "setFlag",
                    "flag": "askedAboutFather",
                    "value": true
                }
            ]
        },
        "act1_dinner_staff_unease": {
            "location": "SALA DA PRANZO",
            "text": "Il giovane valletto che versa il vino ha le mani che tremano appena, gli occhi che scattano verso le finestre ad ogni scricchiolio della vecchia casa. Non è il nervosismo di chi serve per la prima volta a tavola — è qualcosa di più simile alla paura, accuratamente mascherata sotto un contegno professionale che sembra costargli uno sforzo evidente.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "IL NERVOSISMO DELLA SERVITÙ",
                    "entry": "Anche il personale di servizio sembra vivere nella paura, non solo nella discrezione."
                }
            ],
            "onArriveOnce": [
                {
                    "type": "modifyStat",
                    "stat": "indagine",
                    "delta": 1
                },
                {
                    "type": "setFlag",
                    "flag": "noticedStaffUnease",
                    "value": true
                }
            ],
            "options": [
                {
                    "text": "> Torna alla conversazione",
                    "target": "act1_dinner"
                }
            ]
        },
        "act1_dinner_constance_reaction": {
            "location": "SALA DA PRANZO",
            "text": "'Come sta Constance, Edmund?' La domanda cade nel silenzio come una pietra in uno stagno. Per un istante lungo abbastanza da essere eloquente, Edmund smette di masticare, la forchetta immobile a mezz'aria. 'Non sta bene,' dice infine, gli occhi fissi sul piatto. 'I medici del paese... non sono d'accordo tra loro su cosa sia. Preferirei non parlarne a cena, se non ti dispiace.' Cambia argomento prima che Arthur possa insistere, la voce un po' troppo controllata per essere naturale.",
            "onArrive": [
                {
                    "type": "modifyStat",
                    "stat": "nervi",
                    "delta": -1
                },
                {
                    "type": "modifyStat",
                    "stat": "indagine",
                    "delta": 1
                },
                {
                    "type": "addLog",
                    "title": "IL SILENZIO SU CONSTANCE",
                    "entry": "Alla domanda diretta, Edmund risponde solo che sua sorella 'non sta bene' e cambia argomento, la voce innaturalmente controllata."
                }
            ],
            "options": [
                {
                    "text": "> Non insistere, per ora",
                    "target": "act1_retiring"
                }
            ]
        },
        "act1_dinner_empty_seat": {
            "location": "SALA DA PRANZO",
            "text": "In fondo al tavolo, un posto è apparecchiato con la stessa cura degli altri — tovagliolo piegato, bicchiere pulito — eppure nessuno vi si siede, e nessuno lo nomina. Arthur immagina sia il posto di Constance. Il fatto che venga comunque preparato ogni sera, per un'assenza che tutti fingono di non notare, gli sembra più inquietante di una sedia vuota e basta.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "IL POSTO DI CONSTANCE",
                    "entry": "Apparecchiato ogni sera, mai occupato, mai nominato."
                }
            ],
            "options": [
                {
                    "text": "> Torna alla conversazione",
                    "target": "act1_dinner"
                }
            ],
            "onArriveOnce": [
                {
                    "type": "setFlag",
                    "flag": "noticedEmptySeat",
                    "value": true
                }
            ]
        },
        "act1_dinner_local_color": {
            "location": "SALA DA PRANZO",
            "text": "L'argenteria porta lo stemma di famiglia, consumato da generazioni di lucidatura. Il vino è buono ma la bottiglia ha evidentemente anni sul groppone, presa da una cantina che nessuno rifornisce più con regolarità. Ogni dettaglio di Blackthorn Hall racconta la stessa storia: una ricchezza antica che si mantiene per inerzia, non più per cura.",
            "options": [
                {
                    "text": "> Torna alla conversazione",
                    "target": "act1_dinner"
                }
            ]
        },
        "act1_retiring": {
            "location": "STANZA DEGLI OSPITI",
            "music": "act1_night",
            "theme": {
                "colorMain": "#8fa8bd",
                "colorDim": "#5c7285"
            },
            "text": "Mrs. Pemberton lo accompagna nella stanza degli ospiti, nell'ala est della casa. 'Se le serve qualcosa, signore, tiri il cordone del campanello. Sebbene, di notte...' si interrompe, e per la prima volta la sua compostezza vacilla appena. '...di notte è meglio non girare troppo per la casa.' Poi se ne va, senza aggiungere altro.",
            "options": [
                {
                    "text": "> Esamina la stanza prima di coricarti",
                    "target": "act1_room_details",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedRoom",
                        "equals": false
                    }
                },
                {
                    "text": "> Esamina la stanza prima di coricarti",
                    "target": "act1_room_details_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedRoom"
                    }
                },
                {
                    "text": "> Affacciati alla finestra, verso il giardino",
                    "target": "act1_window_silhouette",
                    "condition": {
                        "type": "flag",
                        "flag": "sawSilhouette",
                        "equals": false
                    }
                },
                {
                    "text": "> Affacciati alla finestra, verso il giardino",
                    "target": "act1_window_silhouette_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "sawSilhouette"
                    }
                },
                {
                    "text": "> Nel corridoio, una cameriera sta spegnendo le candele",
                    "target": "act1_corridor_agnes",
                    "condition": {
                        "type": "flag",
                        "flag": "talkedToAgnes",
                        "equals": false
                    }
                },
                {
                    "text": "> Torna a cercare la cameriera nel corridoio",
                    "target": "act1_corridor_agnes_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "talkedToAgnes"
                    }
                },
                {
                    "text": "> Esplora il corridoio verso l'ala ovest",
                    "target": "act1_westwing_door",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedWestWingDoor",
                        "equals": false
                    }
                },
                {
                    "text": "> Esplora il corridoio verso l'ala ovest",
                    "target": "act1_westwing_door_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedWestWingDoor"
                    }
                },
                {
                    "text": "> Prima di dormire, sbircia nella biblioteca poco distante",
                    "target": "act1_library_glance"
                },
                {
                    "text": "> Una porta socchiusa in fondo al corridoio lascia filtrare un lamento sommesso",
                    "target": "act1_constance_glimpse",
                    "condition": {
                        "type": "flag",
                        "flag": "metConstance",
                        "equals": false
                    }
                },
                {
                    "text": "> Torna verso la porta socchiusa di Constance",
                    "target": "act1_constance_glimpse_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "metConstance"
                    }
                },
                {
                    "text": "> Sei stanco dal viaggio: prova a dormire",
                    "target": "act1_night_sounds"
                }
            ]
        },
        "act1_corridor_agnes_revisited": {
            "location": "CORRIDOIO DELL'ALA EST",
            "text": "Il corridoio è vuoto adesso — Agnes dev'essere già passata oltre con le sue candele. In fondo, dietro un uscio socchiuso, Arthur crede di sentire dei passi affrettati, ma quando arriva non c'è più nessuno.",
            "options": [
                {
                    "text": "> Torna verso la tua stanza",
                    "target": "act1_retiring"
                }
            ]
        },
        "act1_constance_glimpse_revisited": {
            "location": "CORRIDOIO DELL'ALA EST",
            "text": "La porta che prima era socchiusa adesso è chiusa a chiave. Da dentro, silenzio assoluto — o forse, se si sforza ad ascoltare, un respiro trattenuto dall'altra parte del legno. Arthur non osa bussare: Constance ha già detto quello che aveva il coraggio di dire, e rischiare di farla scoprire di nuovo non aiuterebbe nessuno dei due.",
            "options": [
                {
                    "text": "> Torna verso la tua stanza",
                    "target": "act1_retiring"
                }
            ]
        },
        "act1_constance_glimpse": {
            "location": "CORRIDOIO DELL'ALA EST",
            "text": "Attraverso lo spiraglio di una porta socchiusa, Arthur scorge una giovane donna seduta accanto alla finestra, il volto pallido illuminato dalla luna — dev'essere Constance. Lei si accorge di lui e, invece di allontanarsi spaventata, gli fa cenno di avvicinarsi. 'Lei è l'amico di Edmund,' sussurra, la voce roca come se parlasse poco, di rado. 'Non si fidi. Non di quello che mio fratello sta per fare.' Prima che Arthur possa chiedere altro, dei passi decisi risuonano in fondo al corridoio — Mrs. Pemberton — e Constance richiude la porta con un gesto rapido, quasi impaurito.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "CONSTANCE",
                    "entry": "'Non si fidi di quello che mio fratello sta per fare,' sussurra Constance, prima di richiudersi in fretta."
                },
                {
                    "type": "playSfx",
                    "sfx": "act1_sussurro"
                }
            ],
            "onArriveOnce": [
                {
                    "type": "setFlag",
                    "flag": "metConstance",
                    "value": true
                },
                {
                    "type": "modifyStat",
                    "stat": "nervi",
                    "delta": -1
                }
            ],
            "options": [
                {
                    "text": "> Allontanati prima che Mrs. Pemberton ti trovi lì",
                    "target": "act1_retiring"
                }
            ]
        },
        "act1_room_details": {
            "location": "STANZA DEGLI OSPITI",
            "text": "La stanza è arredata con gusto vittoriano ormai fuori moda — pesanti tende di velluto, un armadio scuro che scricchiola nel silenzio. Sopra il caminetto, un dipinto raffigura Blackthorn Hall vista dal giardino, ma qualcosa nella prospettiva non torna: una delle finestre dell'ala ovest, nel quadro, è illuminata. Nella realtà, quell'ala è buia e sigillata da anni, per quanto ne sa.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "IL DIPINTO SBAGLIATO",
                    "entry": "Un vecchio dipinto della casa mostra una finestra illuminata nell'ala ovest — oggi sigillata e buia."
                }
            ],
            "onArriveOnce": [
                {
                    "type": "modifyStat",
                    "stat": "nervi",
                    "delta": -1
                },
                {
                    "type": "setFlag",
                    "flag": "examinedRoom",
                    "value": true
                },
                {
                    "type": "setFlag",
                    "flag": "examinedRoom",
                    "value": true
                }
            ],
            "options": [
                {
                    "text": "> Torna a considerare la stanza",
                    "target": "act1_retiring"
                }
            ]
        },
        "act1_window_silhouette": {
            "location": "STANZA DEGLI OSPITI — FINESTRA",
            "art": "<svg viewBox=\"0 0 300 150\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"var(--color-main)\" fill=\"none\" stroke-width=\"2\">\n                <rect x=\"20\" y=\"10\" width=\"120\" height=\"130\" />\n                <line x1=\"80\" y1=\"10\" x2=\"80\" y2=\"140\" />\n                <line x1=\"20\" y1=\"75\" x2=\"140\" y2=\"75\" />\n                <path d=\"M170,140 L185,80 L200,140\" />\n                <path d=\"M250,140 L262,95 L274,140\" />\n                <path d=\"M212,140 L212,110 Q212,102 224,102 Q236,102 236,110 L236,140 Z\" fill=\"var(--color-dim)\" stroke=\"none\" />\n                <circle cx=\"224\" cy=\"94\" r=\"8\" fill=\"var(--color-dim)\" stroke=\"none\" />\n            </svg>",
            "text": "Il giardino, sotto la luna velata di foschia, è immobile e silenzioso. Per un istante, però, tra gli alberi al margine del prato, Arthur crede di scorgere una sagoma ferma — alta, immobile, rivolta verso la casa. Sbatte le palpebre, e quando riguarda non c'è più nulla. Poteva essere un cervo. Poteva essere un ramo spezzato dal vento. Il suo battito cardiaco, però, non sembra convinto di nessuna delle due spiegazioni.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "LA SAGOMA NEL GIARDINO",
                    "entry": "Una figura immobile tra gli alberi, rivolta verso la casa. Scomparsa in un battito di ciglia."
                },
                {
                    "type": "playSfx",
                    "sfx": "act1_presagio"
                }
            ],
            "onArriveOnce": [
                {
                    "type": "setFlag",
                    "flag": "sawSilhouette",
                    "value": true
                },
                {
                    "type": "modifyStat",
                    "stat": "nervi",
                    "delta": -2
                }
            ],
            "options": [
                {
                    "text": "> Allontanati dalla finestra",
                    "target": "act1_retiring"
                }
            ]
        },
        "act1_corridor_agnes": {
            "location": "CORRIDOIO DELL'ALA EST",
            "text": "Una giovane cameriera, intenta a spegnere le candele lungo il corridoio, sussulta vedendolo. 'Oh! Scusi, signore, non volevo... 'Si chiama Agnes, scopre, ed è l'unica persona in casa disposta a parlare con qualcosa che somigli alla sincerità. Abbassa la voce: 'Lei è amico del signor Edmund, vero? Allora forse la ascolterà. Dica alla signorina Constance che non è pazza. Qualunque cosa dicano in paese, non è pazzia quella che ha.' Prima che Arthur possa chiedere altro, sente dei passi e si affretta via.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "AGNES",
                    "entry": "'Non è pazzia quella che ha la signorina Constance,' dice la cameriera, prima di allontanarsi in fretta."
                },
                {
                    "type": "playSfx",
                    "sfx": "act1_sussurro"
                }
            ],
            "onArriveOnce": [
                {
                    "type": "setFlag",
                    "flag": "talkedToAgnes",
                    "value": true
                },
                {
                    "type": "setFlag",
                    "flag": "knowsLayout",
                    "value": true
                },
                {
                    "type": "modifyStat",
                    "stat": "indagine",
                    "delta": 1
                }
            ],
            "options": [
                {
                    "text": "> Torna verso la tua stanza",
                    "target": "act1_retiring"
                }
            ]
        },
        "act1_westwing_door": {
            "location": "ALA OVEST — PORTA SIGILLATA",
            "text": "Il corridoio verso l'ala ovest termina in una pesante porta di quercia, chiusa da un lucchetto che sembra più recente del resto della casa. Da sotto la porta filtra una corrente d'aria fredda, sorprendente per una casa altrimenti così soffocante. Non c'è modo di aprirla, non stanotte — ma Arthur si ripromette di scoprire cosa Edmund tenga così ostinatamente chiuso.",
            "onArrive": [
                {
                    "type": "setFlag",
                    "flag": "knowsLayout",
                    "value": true
                },
                {
                    "type": "addLog",
                    "title": "L'ALA OVEST SIGILLATA",
                    "entry": "Una porta di quercia, lucchetto recente, corrente d'aria fredda da sotto la soglia."
                },
                {
                    "type": "playSfx",
                    "sfx": "act1_porta_cigolio"
                }
            ],
            "options": [
                {
                    "text": "> Torna verso la tua stanza",
                    "target": "act1_retiring"
                }
            ],
            "onArriveOnce": [
                {
                    "type": "setFlag",
                    "flag": "examinedWestWingDoor",
                    "value": true
                },
                {
                    "type": "setFlag",
                    "flag": "examinedWestWingDoor",
                    "value": true
                }
            ]
        },
        "act1_library_glance": {
            "location": "BIBLIOTECA",
            "music": "act1_library",
            "theme": {
                "colorMain": "#d4a441",
                "colorDim": "#8a6a28"
            },
            "art": "<svg viewBox=\"0 0 300 150\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"var(--color-main)\" fill=\"none\" stroke-width=\"2\">\n                <rect x=\"10\" y=\"10\" width=\"90\" height=\"130\" />\n                <line x1=\"10\" y1=\"45\" x2=\"100\" y2=\"45\" />\n                <line x1=\"10\" y1=\"80\" x2=\"100\" y2=\"80\" />\n                <line x1=\"10\" y1=\"115\" x2=\"100\" y2=\"115\" />\n                <line x1=\"25\" y1=\"10\" x2=\"25\" y2=\"130\" />\n                <line x1=\"40\" y1=\"10\" x2=\"40\" y2=\"130\" />\n                <line x1=\"55\" y1=\"10\" x2=\"55\" y2=\"130\" />\n                <line x1=\"70\" y1=\"10\" x2=\"70\" y2=\"130\" />\n                <line x1=\"85\" y1=\"10\" x2=\"85\" y2=\"130\" />\n                <ellipse cx=\"200\" cy=\"112\" rx=\"70\" ry=\"18\" />\n                <line x1=\"150\" y1=\"112\" x2=\"150\" y2=\"140\" />\n                <line x1=\"250\" y1=\"112\" x2=\"250\" y2=\"140\" />\n                <path d=\"M175,102 L200,94 L225,102\" />\n                <line x1=\"255\" y1=\"97\" x2=\"255\" y2=\"72\" />\n                <path d=\"M240,72 L270,72 L262,52 L248,52 Z\" />\n            </svg>",
            "text": "La porta della biblioteca è socchiusa. Dentro, scaffali di quercia scura arrivano fino al soffitto, carichi di volumi che sembrano non essere stati spolverati da anni — eppure, stranamente, alcuni dorsi sono più consumati di altri, come se qualcuno li consultasse spesso. Un tavolo al centro della stanza è ingombro di carte. Arthur sa che dovrebbe essere a letto, ma la curiosità è più forte del sonno.",
            "options": [
                {
                    "text": "> Sfoglia l'albero genealogico della famiglia",
                    "target": "act1_library_genealogy",
                    "condition": {
                        "type": "flag",
                        "flag": "knowsFamilyHistory",
                        "equals": false
                    }
                },
                {
                    "text": "> Sfoglia l'albero genealogico della famiglia",
                    "target": "act1_library_genealogy_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "knowsFamilyHistory"
                    }
                },
                {
                    "text": "> Osserva i volumi più antichi sugli scaffali alti",
                    "target": "act1_library_old_books",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedOldBooks",
                        "equals": false
                    }
                },
                {
                    "text": "> Osserva i volumi più antichi sugli scaffali alti",
                    "target": "act1_library_old_books_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedOldBooks"
                    }
                },
                {
                    "text": "> Dai un'occhiata alle carte sparse sul tavolo",
                    "target": "act1_library_desk",
                    "condition": {
                        "type": "flag",
                        "flag": "deskExamined",
                        "equals": false
                    }
                },
                {
                    "text": "> Dai un'occhiata alle carte sparse sul tavolo",
                    "target": "act1_library_desk_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "deskExamined"
                    }
                },
                {
                    "text": "> È tardi: torna verso la tua stanza",
                    "target": "act1_retiring"
                }
            ]
        },
        "act1_library_genealogy": {
            "location": "BIBLIOTECA — ALBERO GENEALOGICO",
            "text": "Un enorme volume rilegato in pelle raccoglie l'albero genealogico degli Ashcombe, generazione dopo generazione, fin dal Seicento. Arthur nota però qualcosa di strano: due nomi, in due punti diversi dell'albero — sempre un primogenito, sempre a distanza di circa due generazioni l'uno dall'altro — sono stati accuratamente cancellati con l'inchiostro, al punto da rendere la carta quasi consumata in quei punti. Non manomessi per errore: cancellati con cura, con pazienza, come se qualcuno non volesse che restasse traccia.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "I NOMI CANCELLATI",
                    "entry": "Nell'albero genealogico, due primogenoti Ashcombe sono stati cancellati con cura, a distanza di circa due generazioni l'uno dall'altro."
                }
            ],
            "onArriveOnce": [
                {
                    "type": "setFlag",
                    "flag": "knowsFamilyHistory",
                    "value": true
                },
                {
                    "type": "modifyStat",
                    "stat": "indagine",
                    "delta": 1
                }
            ],
            "options": [
                {
                    "text": "> Osserva anche i volumi più antichi",
                    "target": "act1_library_old_books",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedOldBooks",
                        "equals": false
                    }
                },
                {
                    "text": "> Osserva anche i volumi più antichi",
                    "target": "act1_library_old_books_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedOldBooks"
                    }
                },
                {
                    "text": "> Dai un'occhiata alle carte sul tavolo",
                    "target": "act1_library_desk"
                },
                {
                    "text": "> Torna verso la tua stanza",
                    "target": "act1_retiring"
                }
            ]
        },
        "act1_library_old_books": {
            "location": "BIBLIOTECA — SCAFFALI ALTI",
            "text": "I volumi più antichi trattano di argomenti che stridono con la razionalità vittoriana del resto della casa: trattati di botanica esoterica, resoconti di viaggio in terre remote, un paio di testi di filosofia naturale che sfiorano l'occulto più che la scienza. Uno in particolare, più consumato degli altri, porta sul dorso solo le iniziali 'J.A.' impresse in oro. Arthur prova ad aprirlo, ma il testo è in un latino talmente arcaico e specialistico da restargli quasi incomprensibile.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "IL LIBRO DI J.A.",
                    "entry": "Un volume antico, iniziali 'J.A.' in oro sul dorso, testo in un latino troppo arcaico da decifrare stanotte."
                }
            ],
            "onArriveOnce": [
                {
                    "type": "modifyStat",
                    "stat": "nervi",
                    "delta": -1
                },
                {
                    "type": "setFlag",
                    "flag": "examinedOldBooks",
                    "value": true
                },
                {
                    "type": "setFlag",
                    "flag": "examinedOldBooks",
                    "value": true
                }
            ],
            "options": [
                {
                    "text": "> Sfoglia anche l'albero genealogico",
                    "target": "act1_library_genealogy",
                    "condition": {
                        "type": "flag",
                        "flag": "knowsFamilyHistory",
                        "equals": false
                    }
                },
                {
                    "text": "> Sfoglia anche l'albero genealogico",
                    "target": "act1_library_genealogy_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "knowsFamilyHistory"
                    }
                },
                {
                    "text": "> Dai un'occhiata alle carte sul tavolo",
                    "target": "act1_library_desk"
                },
                {
                    "text": "> Torna verso la tua stanza",
                    "target": "act1_retiring"
                }
            ]
        },
        "act1_library_desk": {
            "location": "BIBLIOTECA — SCRIVANIA DI EDMUND",
            "text": "Le carte sul tavolo sono chiaramente opera di Edmund: appunti fitti, alcuni depennati con foga, in mezzo a libri di religione comparata e folklore locale aperti a metà. Una frase, sottolineata due volte, cattura l'attenzione di Arthur: 'deve esistere un modo per sciogliere un legame senza pagarne il prezzo intero.' Non è chiaro a cosa si riferisca — ma il tono, disperato più che accademico, dice più di quanto Edmund abbia mai detto a voce alta.",
            "options": [
                {
                    "text": "> Osserva le carte senza toccarle",
                    "target": "act1_library_glance",
                    "effects": [
                        {
                            "type": "modifyStat",
                            "stat": "indagine",
                            "delta": 1
                        },
                        {
                            "type": "addLog",
                            "title": "LE RICERCHE DI EDMUND",
                            "entry": "'Deve esistere un modo per sciogliere un legame senza pagarne il prezzo intero,' ha scritto Edmund."
                        },
                        {
                            "type": "setFlag",
                            "flag": "deskExamined",
                            "value": true
                        }
                    ]
                },
                {
                    "text": "> Prendi discretamente uno dei fogli di appunti",
                    "target": "act1_library_glance",
                    "effects": [
                        {
                            "type": "modifyStat",
                            "stat": "fiducia",
                            "delta": -1
                        },
                        {
                            "type": "addItem",
                            "id": "appunti_edmund",
                            "name": "Appunti di Edmund",
                            "desc": "Un foglio sottratto dalla sua scrivania.",
                            "examine": "'...un legame senza pagarne il prezzo intero. Ho provato ogni via nei testi di Josiah, ma ogni pagina mi riporta alla stessa conclusione che rifiuto di accettare. Deve esserci un'alternativa al patto. Deve.' Le parole 'il patto' sono sottolineate tre volte, con una violenza quasi visibile nel tratto di penna."
                        },
                        {
                            "type": "addLog",
                            "title": "UN FOGLIO SOTTRATTO",
                            "entry": "Hai preso un appunto di Edmund. Menziona 'il patto' — sottolineato tre volte."
                        },
                        {
                            "type": "playSfx",
                            "sfx": "act1_carta_furtiva"
                        },
                        {
                            "type": "setFlag",
                            "flag": "deskExamined",
                            "value": true
                        }
                    ]
                }
            ]
        },
        "act1_library_desk_revisited": {
            "location": "BIBLIOTECA — SCRIVANIA DI EDMUND",
            "text": "Le carte sulla scrivania sono le stesse di prima. Le ha già esaminate con attenzione — non c'è altro da scoprire qui, per ora.",
            "options": [
                {
                    "text": "> Torna a considerare la biblioteca",
                    "target": "act1_library_glance"
                }
            ]
        },
        "act1_night_sounds": {
            "location": "STANZA DEGLI OSPITI — NOTTE FONDA",
            "music": "act1_danger",
            "theme": {
                "colorMain": "#b3552f",
                "colorDim": "#7a3a1f"
            },
            "text": "Arthur si sveglia di soprassalto. La casa è immersa nel silenzio più totale — troppo totale, se non fosse per un suono sordo, ritmico, che sembra provenire da dentro i muri stessi. Non è il vento. Non sono tubature che si raffreddano. È qualcosa che si muove, lentamente, in uno spazio che secondo ogni logica architettonica non dovrebbe esistere.",
            "onArrive": [
                {
                    "type": "modifyStat",
                    "stat": "nervi",
                    "delta": -2
                },
                {
                    "type": "addLog",
                    "title": "RUMORE NEI MURI",
                    "entry": "Un suono sordo e ritmico dentro i muri, nel cuore della notte. Non è il vento."
                },
                {
                    "type": "playSfx",
                    "sfx": "act1_cigolio_muro"
                }
            ],
            "options": [
                {
                    "text": "> Alzati e scendi a controllare",
                    "target": "act1_night_investigate_safe",
                    "condition": {
                        "any": [
                            {
                                "type": "flag",
                                "flag": "hasLamp"
                            },
                            {
                                "type": "flag",
                                "flag": "knowsLayout"
                            }
                        ]
                    }
                },
                {
                    "text": "> Alzati e scendi a controllare",
                    "target": "act1_night_investigate_dark",
                    "condition": {
                        "all": [
                            {
                                "type": "flag",
                                "flag": "hasLamp",
                                "equals": false
                            },
                            {
                                "type": "flag",
                                "flag": "knowsLayout",
                                "equals": false
                            }
                        ]
                    }
                },
                {
                    "text": "> Resta a letto: qualunque cosa sia, aspetterà fino a domani",
                    "target": "act1_night_wait"
                }
            ]
        },
        "act1_night_investigate_safe": {
            "location": "CORRIDOIO DI SERVIZIO",
            "text": "Con la lanterna in mano — o forte della conoscenza della casa raccolta durante la giornata — Arthur scende con cautela verso la scala di servizio, da dove sembrava provenire il suono. Non trova nulla di conclusivo: solo una porta che dovrebbe essere chiusa a chiave, socchiusa, e un'impronta di fango fresco sul pavimento di pietra, diretta verso l'ala ovest. Il suono, ormai, è cessato del tutto.",
            "onArrive": [
                {
                    "type": "modifyStat",
                    "stat": "nervi",
                    "delta": -1
                },
                {
                    "type": "modifyStat",
                    "stat": "indagine",
                    "delta": 1
                },
                {
                    "type": "addLog",
                    "title": "L'IMPRONTA NEL CORRIDOIO",
                    "entry": "Una porta socchiusa che dovrebbe essere chiusa a chiave, e un'impronta di fango fresco verso l'ala ovest."
                },
                {
                    "type": "playSfx",
                    "sfx": "act1_porta_cigolio"
                }
            ],
            "options": [
                {
                    "text": "> Torna a letto: ne parlerai con Edmund domani mattina",
                    "target": "act1_act1_close"
                }
            ]
        },
        "act1_night_investigate_dark": {
            "location": "SCALA DI SERVIZIO — BUIO TOTALE",
            "music": "act1_ending_death",
            "theme": {
                "colorMain": "#8b1e1e",
                "colorDim": "#4a0f0f"
            },
            "text": "Senza luce, e senza la minima idea di come sia fatta questa parte della casa, Arthur avanza a tentoni nel corridoio di servizio, una mano contro il muro freddo. Il suono si è fatto più vicino, più insistente — e proprio mentre si volta per capire da dove venga, il suo piede trova il vuoto invece di un gradino.\n\nLa caduta lungo la scala di servizio è breve, ma la testa sbatte contro la pietra con un suono secco che Arthur, da medico, riconosce anche mentre gli si spegne la coscienza. Nessuno lo troverà prima dell'alba.\n\n[FINALE PREMATURO — UN PASSO NEL BUIO]",
            "onArrive": [
                {
                    "type": "playSfx",
                    "sfx": "act1_impatto"
                }
            ],
            "options": [
                {
                    "text": "> Torna al Menu Principale",
                    "target": "__mainMenu__"
                }
            ]
        },
        "act1_night_wait": {
            "location": "STANZA DEGLI OSPITI — NOTTE FONDA",
            "text": "Arthur resta immobile sotto le coperte, il cuore che batte forte, finché il suono non svanisce da solo. Il sonno che segue è leggero e pieno di sogni che non ricorderà, ma almeno arriva. Quando apre di nuovo gli occhi, una luce grigia e incerta filtra dalle tende: è mattina.",
            "onArrive": [
                {
                    "type": "setFlag",
                    "flag": "waitedTillDawn",
                    "value": true
                },
                {
                    "type": "modifyStat",
                    "stat": "nervi",
                    "delta": 1
                }
            ],
            "options": [
                {
                    "text": "> Alzati: è ora di affrontare la giornata",
                    "target": "act1_act1_close"
                }
            ]
        },
        "act1_act1_close": {
            "location": "BLACKTHORN HALL — ALL'ALBA",
            "music": "act1_ending_dawn",
            "theme": {
                "colorMain": "#e0b96b",
                "colorDim": "#a3823f"
            },
            "text": "La luce del mattino rende Blackthorn Hall quasi ordinaria — quasi. Arthur si veste con cura, ripensando alla notte appena trascorsa, alla lettera che lo ha portato fin qui, allo sguardo di Edmund carico di qualcosa che non è ancora riuscito a nominare. Oggi, si ripromette, otterrà delle risposte. Con o senza il permesso di nessuno.\n\n[FINE DELL'ATTO I — continua nell'Atto II]",
            "onArrive": [],
            "options": [
                {
                    "text": "> Fine dell'Atto I — prosegui nell'Atto II",
                    "target": "act2_dawn_wake"
                }
            ]
        },
        "act2_dawn_wake": {
            "location": "STANZA DEGLI OSPITI — MATTINO",
            "music": "act2_morning",
            "theme": {
                "colorMain": "#e0b96b",
                "colorDim": "#a3823f"
            },
            "art": "<svg viewBox=\"0 0 300 150\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"var(--color-main)\" fill=\"none\" stroke-width=\"2\">\n                <rect x=\"60\" y=\"20\" width=\"120\" height=\"110\" />\n                <line x1=\"120\" y1=\"20\" x2=\"120\" y2=\"130\" />\n                <line x1=\"60\" y1=\"75\" x2=\"180\" y2=\"75\" />\n                <line x1=\"130\" y1=\"10\" x2=\"160\" y2=\"40\" />\n                <line x1=\"145\" y1=\"5\" x2=\"175\" y2=\"35\" />\n                <line x1=\"160\" y1=\"15\" x2=\"190\" y2=\"45\" />\n                <circle cx=\"220\" cy=\"30\" r=\"18\" />\n            </svg>",
            "text": "Un fascio di luce grigia e polverosa filtra dalle tende pesanti. Arthur si sveglia con la sensazione di non aver dormito affatto, per quanto la notte gli sembri già distante, quasi irreale alla luce del giorno. Da qualche parte, in lontananza, una campana di chiesa rintocca due volte — le otto del mattino ad Alderbrook.",
            "onArrive": [
                {
                    "type": "playSfx",
                    "sfx": "act2_campana"
                },
                {
                    "type": "addLog",
                    "title": "SECONDO GIORNO",
                    "entry": "Il mattino dopo la prima notte a Blackthorn Hall. Arthur è deciso a ottenere risposte."
                }
            ],
            "options": [
                {
                    "text": "> Vestiti e scendi per la colazione",
                    "target": "act2_breakfast_edmund"
                }
            ]
        },
        "act2_breakfast_edmund": {
            "location": "SALA DA PRANZO — MATTINO",
            "text": "Edmund è già seduto, un piatto intatto davanti a sé. Ha l'aria di chi non ha dormito meglio di Arthur. Il silenzio tra i due si allunga, carico di tutto ciò che non è stato ancora detto.",
            "options": [
                {
                    "text": "> Racconta cosa hai sentito e visto la notte scorsa, senza giri di parole",
                    "target": "act2_breakfast_press"
                },
                {
                    "text": "> Lascia che sia Edmund a parlare per primo, con calma",
                    "target": "act2_breakfast_patient"
                },
                {
                    "text": "> Mostragli l'appunto che hai preso dalla sua scrivania",
                    "target": "act2_breakfast_notes_confront",
                    "condition": {
                        "type": "item",
                        "item": "appunti_edmund",
                        "quantity": 1
                    }
                },
                {
                    "text": "> Chiedigli un momento, prima che l'atmosfera si irrigidisca",
                    "target": "act2_edmund_aside2",
                    "condition": {
                        "type": "flag",
                        "flag": "hadPrivateMomentAct2",
                        "equals": false
                    }
                },
                {
                    "text": "> Chiedigli un momento, prima che l'atmosfera si irrigidisca",
                    "target": "act2_edmund_aside2_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "hadPrivateMomentAct2"
                    }
                },
                {
                    "text": "> Nota un giornale locale ripiegato accanto al piatto di Edmund",
                    "target": "act2_breakfast_newspaper",
                    "condition": {
                        "type": "flag",
                        "flag": "readNewspaper",
                        "equals": false
                    }
                },
                {
                    "text": "> Nota un giornale locale ripiegato accanto al piatto di Edmund",
                    "target": "act2_breakfast_newspaper_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "readNewspaper"
                    }
                }
            ]
        },
        "act2_edmund_aside2": {
            "location": "SALA DA PRANZO — MATTINO",
            "text": "Arthur posa una mano sul braccio dell'amico, un gesto semplice, quello di sempre. 'Sono qui per te, Edmund. Qualunque cosa sia.' Per un istante gli occhi di Edmund si inumidiscono — poi annuisce, senza riuscire ancora a parlare, e il momento passa.",
            "options": [
                {
                    "text": "> Torna alla colazione",
                    "target": "act2_breakfast_edmund"
                }
            ],
            "onArriveOnce": [
                {
                    "type": "setFlag",
                    "flag": "hadPrivateMomentAct2",
                    "value": true
                },
                {
                    "type": "modifyStat",
                    "stat": "fiducia",
                    "delta": 1
                },
                {
                    "type": "setFlag",
                    "flag": "hadPrivateMomentEdmund",
                    "value": true
                }
            ]
        },
        "act2_breakfast_newspaper": {
            "location": "SALA DA PRANZO — MATTINO",
            "text": "La Gazzetta di Alderbrook riporta, in un trafiletto in seconda pagina, la scomparsa di un bracciante della zona 'in circostanze poco chiare', e un editoriale che si lamenta genericamente dei 'nervi deboli' che affliggerebbero sempre più famiglie di campagna. Nessun nome. Nessun collegamento esplicito a Blackthorn Hall. Eppure.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "LA GAZZETTA DI ALDERBROOK",
                    "entry": "Un bracciante scomparso 'in circostanze poco chiare'. Nessun nome fatto, ma il sospetto resta."
                }
            ],
            "options": [
                {
                    "text": "> Torna alla colazione",
                    "target": "act2_breakfast_edmund"
                }
            ],
            "onArriveOnce": [
                {
                    "type": "setFlag",
                    "flag": "readNewspaper",
                    "value": true
                },
                {
                    "type": "setFlag",
                    "flag": "readNewspaper",
                    "value": true
                }
            ]
        },
        "act2_breakfast_press": {
            "location": "SALA DA PRANZO — MATTINO",
            "text": "Arthur non gira più intorno alla questione: il rumore nei muri, gli sguardi di Mrs. Pemberton, il posto vuoto di Constance. Edmund lo ascolta senza interromperlo, il volto sempre più teso, ma quando Arthur finisce si limita a dire: 'Non qui dentro. Ti prego. Dopo, in giardino — te lo prometto.' Non è un rifiuto, ma nemmeno una vera risposta.",
            "onArrive": [
                {
                    "type": "modifyStat",
                    "stat": "indagine",
                    "delta": 1
                }
            ],
            "options": [
                {
                    "text": "> Accetta, per ora",
                    "target": "act2_pemberton_morning"
                }
            ]
        },
        "act2_breakfast_patient": {
            "location": "SALA DA PRANZO — MATTINO",
            "text": "Arthur sceglie la pazienza. Mangiano quasi in silenzio, e proprio quando sembra che la colazione finirà senza una parola di senso, Edmund dice, piano: 'Grazie di non avermi obbligato a spiegare tutto stamattina. Non sono ancora pronto. Ma lo sarò, prima che tu debba ripartire.' Sembra sincero — o disperatamente voglioso di esserlo.",
            "onArrive": [
                {
                    "type": "modifyStat",
                    "stat": "fiducia",
                    "delta": 1
                }
            ],
            "options": [
                {
                    "text": "> Concedigli il tempo che chiede",
                    "target": "act2_pemberton_morning"
                }
            ]
        },
        "act2_breakfast_notes_confront": {
            "location": "SALA DA PRANZO — MATTINO",
            "text": "Arthur posa il foglio sul tavolo, tra loro. Edmund lo fissa a lungo prima di alzare lo sguardo — non c'è rabbia nei suoi occhi, solo un sollievo quasi doloroso, come chi non deve più portare da solo un peso. 'Allora l'hai visto,' mormora. 'Il patto.' Si passa una mano sul volto. 'Non qui. Ma sì — hai ragione a chiedere. Te lo dirò. Tutto.'",
            "onArrive": [
                {
                    "type": "modifyStat",
                    "stat": "fiducia",
                    "delta": -1
                },
                {
                    "type": "addLog",
                    "title": "EDMUND SA CHE SAI",
                    "entry": "Messo di fronte all'appunto, Edmund promette di raccontare tutto — ma non qui."
                }
            ],
            "options": [
                {
                    "text": "> Accetta la sua promessa",
                    "target": "act2_edmund_confession_partial"
                }
            ]
        },
        "act2_edmund_confession_partial": {
            "location": "SALA DA PRANZO — MATTINO",
            "text": "'Non posso dirti tutto a stomaco vuoto e con Pemberton che passa ogni cinque minuti,' dice Edmund a bassa voce, 'ma questo sì: la mia famiglia deve qualcosa a qualcosa, da molto prima che io nascessi. E credo che tocchi a me pagare il conto. Sto solo cercando di capire se esiste un altro modo.' Non aggiunge altro — ma per la prima volta, Arthur ha la sensazione che Edmund voglia davvero essere aiutato, non solo consolato.",
            "onArrive": [
                {
                    "type": "setFlag",
                    "flag": "edmundConfessedPartial",
                    "value": true
                },
                {
                    "type": "modifyStat",
                    "stat": "fiducia",
                    "delta": 2
                },
                {
                    "type": "addLog",
                    "title": "IL PATTO, IN PARTE",
                    "entry": "Edmund conferma: la famiglia 'deve qualcosa' e teme che tocchi a lui pagare. Cerca un'alternativa."
                }
            ],
            "options": [
                {
                    "text": "> Prosegui la giornata",
                    "target": "act2_pemberton_morning"
                }
            ]
        },
        "act2_pemberton_morning": {
            "location": "CORRIDOIO PRINCIPALE — MATTINO",
            "text": "Mrs. Pemberton attraversa il corridoio con una pila di lenzuola tra le braccia, il passo un po' meno saldo del solito. Alla luce del giorno, senza le ombre di candela a nasconderlo, Arthur nota per la prima volta quanto sia pallida — e quanto le tremino leggermente le mani.",
            "options": [
                {
                    "text": "> Nota che Mrs. Pemberton non sembra stare bene, e offriti di aiutarla",
                    "target": "act2_pemberton_kindness",
                    "condition": {
                        "type": "flag",
                        "flag": "pembertonWarmedUp",
                        "equals": false
                    }
                },
                {
                    "text": "> Esci in giardino a cercare Edmund",
                    "target": "act2_grounds_daylight"
                }
            ]
        },
        "act2_pemberton_kindness": {
            "location": "CORRIDOIO PRINCIPALE — MATTINO",
            "text": "'Non è nulla, dottore, solo il cuore che invecchia più in fretta del resto,' dice lei, quasi seccata — ma non si sottrae quando Arthur insiste, con la delicatezza di chi lo fa per mestiere, per controllarle il polso. Qualcosa, in quel gesto professionale e privo di morbosità, sembra spezzare una diga tenuta a forza per anni. Per un istante, i suoi occhi si inumidiscono. 'Nessuno, in questa casa, chiede più come sto io. Da molto tempo.'",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "MRS. PEMBERTON SI APRE",
                    "entry": "Un semplice gesto di cura medica, offerto senza secondi fini, sembra aver raggiunto qualcosa che anni di cortesia non avevano scalfito."
                },
                {
                    "type": "playSfx",
                    "sfx": "act2_oggetto"
                }
            ],
            "onArriveOnce": [
                {
                    "type": "setFlag",
                    "flag": "pembertonWarmedUp",
                    "value": true
                },
                {
                    "type": "modifyStat",
                    "stat": "fiducia",
                    "delta": 1
                }
            ],
            "options": [
                {
                    "text": "> Chiedile, con delicatezza, cosa sa davvero di questa casa",
                    "target": "act2_pemberton_reveals"
                }
            ]
        },
        "act2_pemberton_reveals": {
            "location": "CORRIDOIO PRINCIPALE — MATTINO",
            "text": "Mrs. Pemberton abbassa la voce fino a un sussurro, come se le pareti stesse potessero ascoltare. 'Ho servito il padre del signor Edmund, e prima ancora suo nonno. So che nell'ala ovest c'è qualcosa che nessun Ashcombe ha mai osato spiegarmi del tutto — solo che la chiave della porta grande è nascosta dietro il ritratto di Lord Josiah, nell'ingresso. Non gliel'ho mai detto a nessuno. Gliela dico a lei perché forse lei può ancora salvarlo, quel ragazzo, dove io non sono mai riuscita.'",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "LA CHIAVE NASCOSTA",
                    "entry": "Mrs. Pemberton rivela: la chiave dell'ala ovest è nascosta dietro il ritratto di Lord Josiah nell'ingresso."
                }
            ],
            "options": [
                {
                    "text": "> Ringraziala ed esci in giardino a cercare Edmund",
                    "target": "act2_grounds_daylight"
                }
            ]
        },
        "act2_grounds_daylight": {
            "location": "GIARDINO DI BLACKTHORN HALL — MATTINO",
            "music": "act2_grounds",
            "theme": {
                "colorMain": "#8fae6b",
                "colorDim": "#5c7a3f"
            },
            "text": "Alla luce del giorno il giardino incolto perde parte della sua minaccia notturna, ma non tutta: i rovi, la statua spezzata, il silenzio innaturale di un luogo che nessuno cura più restano lì, semplicemente più visibili. Di Edmund, nessuna traccia immediata — ma un sentiero appena distinguibile tra i rovi conduce verso il bosco, in direzione della vecchia cappella di famiglia.",
            "options": [
                {
                    "text": "> Osserva di nuovo la statua spezzata, ora alla luce del giorno",
                    "target": "act2_statue_daylight",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedStatueDaylight",
                        "equals": false
                    }
                },
                {
                    "text": "> Osserva di nuovo la statua spezzata, ora alla luce del giorno",
                    "target": "act2_statue_daylight_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedStatueDaylight"
                    }
                },
                {
                    "text": "> Dai un'occhiata alla vecchia serra abbandonata",
                    "target": "act2_greenhouse",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedGreenhouse",
                        "equals": false
                    }
                },
                {
                    "text": "> Dai un'occhiata alla vecchia serra abbandonata",
                    "target": "act2_greenhouse_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedGreenhouse"
                    }
                },
                {
                    "text": "> Incamminati lungo il sentiero verso la cappella e il cimitero di famiglia",
                    "target": "act2_crypt_entrance"
                }
            ]
        },
        "act2_statue_daylight": {
            "location": "GIARDINO DI BLACKTHORN HALL — MATTINO",
            "text": "Da vicino, il volto scalpellato via della statua rivela tracce di scalpellature deliberate e recenti — non l'usura di decenni, ma il lavoro di qualcuno che ha voluto, in tempi non troppo lontani, cancellare un viso specifico. Sul basamento, a stento leggibile, resta solo la prima lettera di un nome: una 'J'.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "LA STATUA SFIGURATA",
                    "entry": "Il volto della statua è stato scalpellato di proposito, non consumato dal tempo. Resta solo una 'J' sul basamento."
                }
            ],
            "options": [
                {
                    "text": "> Torna a considerare il giardino",
                    "target": "act2_grounds_daylight"
                }
            ],
            "onArriveOnce": [
                {
                    "type": "setFlag",
                    "flag": "examinedStatueDaylight",
                    "value": true
                },
                {
                    "type": "setFlag",
                    "flag": "examinedStatueDaylight",
                    "value": true
                }
            ]
        },
        "act2_greenhouse": {
            "location": "SERRA ABBANDONATA",
            "text": "Una serra di ferro e vetro, per metà crollata, ospita ancora file di vasi con piante esotiche ormai secche — orchidee, forse, o qualcosa di più insolito, impossibile dirlo ormai. Un cartellino ingiallito su uno dei vasi porta una scritta a mano: 'J.A. — coltivazione sperimentale, non disturbare.' La stessa calligrafia del libro nella biblioteca.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "LA SERRA DI J.A.",
                    "entry": "Piante esotiche essiccate, etichettate dalla stessa mano del libro in biblioteca: 'J.A. — non disturbare.'"
                }
            ],
            "onArriveOnce": [
                {
                    "type": "modifyStat",
                    "stat": "nervi",
                    "delta": -1
                },
                {
                    "type": "setFlag",
                    "flag": "examinedGreenhouse",
                    "value": true
                },
                {
                    "type": "setFlag",
                    "flag": "examinedGreenhouse",
                    "value": true
                }
            ],
            "options": [
                {
                    "text": "> Torna a considerare il giardino",
                    "target": "act2_grounds_daylight"
                }
            ]
        },
        "act2_crypt_entrance": {
            "location": "CIMITERO DI FAMIGLIA",
            "music": "act2_crypt",
            "theme": {
                "colorMain": "#6b8f8a",
                "colorDim": "#3f5c58"
            },
            "art": "<svg viewBox=\"0 0 300 150\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"var(--color-main)\" fill=\"none\" stroke-width=\"2\">\n                <path d=\"M110,140 L110,60 L150,20 L190,60 L190,140\" />\n                <rect x=\"140\" y=\"90\" width=\"20\" height=\"50\" />\n                <line x1=\"150\" y1=\"30\" x2=\"150\" y2=\"10\" />\n                <line x1=\"142\" y1=\"18\" x2=\"158\" y2=\"18\" />\n                <path d=\"M30,140 Q40,120 50,140\" />\n                <path d=\"M230,140 Q245,115 260,140\" />\n                <rect x=\"60\" y=\"125\" width=\"18\" height=\"15\" />\n                <rect x=\"210\" y=\"128\" width=\"18\" height=\"12\" />\n            </svg>",
            "text": "Il bosco si apre su una piccola cappella di pietra scura, la porta socchiusa su un interno che Arthur non ha intenzione di esplorare per primo. Intorno, un piccolo cimitero di famiglia: lapidi consumate dal tempo e dal muschio, alcune quasi illeggibili. Sulla porta della cappella, un'iscrizione latina è incisa in caratteri più profondi delle altre.",
            "options": [
                {
                    "text": "> Osserva le lapidi del cimitero",
                    "target": "act2_crypt_graves",
                    "condition": {
                        "type": "flag",
                        "flag": "sawErasedGraves",
                        "equals": false
                    }
                },
                {
                    "text": "> Osserva le lapidi del cimitero",
                    "target": "act2_crypt_graves_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "sawErasedGraves"
                    }
                },
                {
                    "text": "> Prova a leggere l'iscrizione sulla porta della cappella",
                    "target": "act2_crypt_inscription",
                    "condition": {
                        "type": "flag",
                        "flag": "inscriptionAttempted",
                        "equals": false
                    }
                },
                {
                    "text": "> Prova a leggere l'iscrizione sulla porta della cappella",
                    "target": "act2_crypt_inscription_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "inscriptionAttempted"
                    }
                },
                {
                    "text": "> Entra nella cappella",
                    "target": "act2_crypt_enter_check"
                }
            ]
        },
        "act2_crypt_graves": {
            "location": "CIMITERO DI FAMIGLIA",
            "text": "La maggior parte delle lapidi è quello che ci si aspetterebbe: nomi consumati, date illeggibili, muschio ovunque. Ma due tombe, poco distanti l'una dall'altra, spiccano per un dettaglio sconcertante — sono chiaramente più curate delle altre. L'erba intorno è tagliata, la pietra ripulita di recente. Nessun nome inciso su nessuna delle due: solo uno spazio liscio, dove un nome avrebbe dovuto esserci.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "LE TOMBE SENZA NOME",
                    "entry": "Due tombe, curate meglio di tutte le altre, senza alcun nome inciso. Combaciano con i due nomi cancellati dall'albero genealogico."
                }
            ],
            "onArriveOnce": [
                {
                    "type": "setFlag",
                    "flag": "sawErasedGraves",
                    "value": true
                },
                {
                    "type": "setFlag",
                    "flag": "scoutedGrounds",
                    "value": true
                },
                {
                    "type": "modifyStat",
                    "stat": "nervi",
                    "delta": -1
                }
            ],
            "options": [
                {
                    "text": "> Torna a considerare il cimitero",
                    "target": "act2_crypt_entrance"
                }
            ]
        },
        "act2_crypt_inscription": {
            "location": "CIMITERO DI FAMIGLIA — PORTA DELLA CAPPELLA",
            "text": "L'iscrizione è consumata ma non del tutto persa. Il latino di Arthur, arrugginito dai tempi dell'università, fatica a ricostruire il senso completo della frase.",
            "options": [
                {
                    "text": "> Concentrati e prova a tradurla per intero",
                    "target": "act2_crypt_entrance",
                    "skillCheck": {
                        "stat": "indagine",
                        "difficulty": 6,
                        "success": "act2_crypt_inscription_success",
                        "failure": "act2_crypt_inscription_fail"
                    },
                    "effects": [
                        {
                            "type": "setFlag",
                            "flag": "inscriptionAttempted",
                            "value": true
                        }
                    ]
                },
                {
                    "text": "> Lascia perdere per ora, non è il momento",
                    "target": "act2_crypt_entrance"
                }
            ],
            "onArriveOnce": [
                {
                    "type": "setFlag",
                    "flag": "readInscription",
                    "value": true
                }
            ]
        },
        "act2_crypt_inscription_success": {
            "location": "CIMITERO DI FAMIGLIA — PORTA DELLA CAPPELLA",
            "text": "Pezzo per pezzo, il senso emerge: 'Ciò che riceviamo dal bosco, al bosco un giorno torna. Che il custode non dimentichi mai il prezzo pattuito.' Non è una preghiera. È un promemoria — inciso in pietra perché nessuno, mai, potesse fingere di aver dimenticato i termini.",
            "onArrive": [
                {
                    "type": "playSfx",
                    "sfx": "act2_pergamena"
                }
            ],
            "onArriveOnce": [
                {
                    "type": "setFlag",
                    "flag": "readInscription",
                    "value": true
                },
                {
                    "type": "setFlag",
                    "flag": "scoutedGrounds",
                    "value": true
                },
                {
                    "type": "modifyStat",
                    "stat": "indagine",
                    "delta": 1
                }
            ],
            "options": [
                {
                    "text": "> Torna a considerare il cimitero",
                    "target": "act2_crypt_entrance"
                }
            ]
        },
        "act2_crypt_inscription_fail": {
            "location": "CIMITERO DI FAMIGLIA — PORTA DELLA CAPPELLA",
            "text": "Il latino resta ostinatamente frammentario — Arthur riconosce solo poche parole isolate, 'bosco' e 'prezzo', senza riuscire a comporne il senso completo. Forse con più tempo, o più luce.",
            "options": [
                {
                    "text": "> Torna a considerare il cimitero",
                    "target": "act2_crypt_entrance"
                }
            ]
        },
        "act2_crypt_enter_check": {
            "location": "SOGLIA DELLA CAPPELLA",
            "text": "La porta socchiusa lascia intravedere solo buio, oltre la soglia.",
            "options": [
                {
                    "text": "> Entra nella cappella",
                    "target": "act2_crypt_safe",
                    "condition": {
                        "any": [
                            {
                                "type": "flag",
                                "flag": "hasLamp"
                            },
                            {
                                "type": "flag",
                                "flag": "knowsLayout"
                            },
                            {
                                "type": "flag",
                                "flag": "scoutedGrounds"
                            }
                        ]
                    }
                },
                {
                    "text": "> Entra nella cappella",
                    "target": "act2_crypt_danger",
                    "condition": {
                        "all": [
                            {
                                "type": "flag",
                                "flag": "hasLamp",
                                "equals": false
                            },
                            {
                                "type": "flag",
                                "flag": "knowsLayout",
                                "equals": false
                            },
                            {
                                "type": "flag",
                                "flag": "scoutedGrounds",
                                "equals": false
                            }
                        ]
                    }
                },
                {
                    "text": "> Ripensaci: torna a considerare il cimitero",
                    "target": "act2_crypt_entrance"
                }
            ]
        },
        "act2_crypt_danger": {
            "location": "INTERNO DELLA CAPPELLA — BUIO TOTALE",
            "music": "act2_ending_death",
            "theme": {
                "colorMain": "#8b1e1e",
                "colorDim": "#4a0f0f"
            },
            "text": "Senza luce, Arthur avanza a tentoni tra le panche di pietra. Il pavimento, sotto i suoi piedi, cede improvvisamente — non terra, ma il vuoto di una cripta sotterranea mai segnalata, celata sotto lastre di pietra marce. La caduta è breve ma la posizione in cui atterra, tra ossa antiche e pietra spezzata, non lascia scampo: il collo si spezza nell'impatto.\n\n[FINALE PREMATURO — IL PAVIMENTO CHE INGHIOTTE]",
            "onArrive": [
                {
                    "type": "playSfx",
                    "sfx": "act2_impatto"
                }
            ],
            "options": [
                {
                    "text": "> Torna al Menu Principale",
                    "target": "__mainMenu__"
                }
            ]
        },
        "act2_crypt_safe": {
            "location": "INTERNO DELLA CAPPELLA",
            "text": "Con la lanterna a rischiarare il passo — o semplicemente sapendo dove non mettere i piedi — Arthur esplora l'interno della cappella senza incidenti. È spoglia, quasi dimessa, tranne per un dettaglio: un piccolo altare laterale, ripulito di recente, con tracce di cera fresca. Qualcuno viene ancora qui. Di recente. Forse regolarmente.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "L'ALTARE CURATO",
                    "entry": "Un altare laterale nella cappella è ripulito di recente, con tracce di cera fresca. Qualcuno lo usa ancora."
                }
            ],
            "options": [
                {
                    "text": "> Esci e va' a cercare Edmund",
                    "target": "act2_key_search_intro"
                }
            ]
        },
        "act2_key_search_intro": {
            "location": "BLACKTHORN HALL — TARDO MATTINO",
            "text": "Tornato in casa, Arthur è ormai deciso: prima o poi dovrà vedere con i suoi occhi cosa nasconde l'ala ovest. La domanda è come procurarsi la chiave.",
            "options": [
                {
                    "text": "> Segui l'indicazione di Mrs. Pemberton: cerca dietro il ritratto di Lord Josiah",
                    "target": "act2_key_from_pemberton",
                    "condition": {
                        "type": "flag",
                        "flag": "pembertonWarmedUp"
                    }
                },
                {
                    "text": "> Fruga nello studio di Edmund quando non guarda",
                    "target": "act2_key_from_study"
                },
                {
                    "text": "> Usa gli strumenti della borsa medica per forzare la serratura",
                    "target": "act2_key_pick_lock",
                    "condition": {
                        "type": "flag",
                        "flag": "pickAttempted",
                        "equals": false
                    }
                }
            ]
        },
        "act2_key_from_pemberton": {
            "location": "INGRESSO DI BLACKTHORN HALL",
            "text": "Come indicato, dietro la cornice del ritratto di Lord Josiah, le dita di Arthur trovano una piccola chiave di ferro battuto, fredda e pesante. Per un istante, alzando lo sguardo, ha di nuovo l'impressione che gli occhi dipinti di Josiah lo stiano osservando con qualcosa che somiglia, stranamente, a un'approvazione.",
            "onArrive": [
                {
                    "type": "setFlag",
                    "flag": "hasWestWingKey",
                    "value": true
                },
                {
                    "type": "addItem",
                    "id": "chiave_ala_ovest",
                    "name": "Chiave dell'Ala Ovest",
                    "desc": "Ferro battuto, pesante, fredda al tatto.",
                    "examine": "Una chiave antica, di fattura non recente. Il ferro è freddo anche tenuto in mano a lungo — più freddo di quanto la temperatura della stanza giustifichi."
                },
                {
                    "type": "modifyStat",
                    "stat": "fiducia",
                    "delta": 1
                },
                {
                    "type": "addLog",
                    "title": "LA CHIAVE TROVATA",
                    "entry": "Trovata dietro il ritratto di Lord Josiah, esattamente come indicato da Mrs. Pemberton."
                },
                {
                    "type": "playSfx",
                    "sfx": "act2_oggetto"
                }
            ],
            "options": [
                {
                    "text": "> Vai alla porta dell'ala ovest",
                    "target": "act2_westwing_threshold"
                }
            ]
        },
        "act2_key_from_study": {
            "location": "STUDIO DI EDMUND",
            "text": "Con il cuore in gola, Arthur fruga rapidamente tra i cassetti dello studio di Edmund mentre la casa è silenziosa. Nel terzo cassetto, sotto una pila di lettere non spedite, trova una chiave di ferro battuto che sembra fatta apposta per una porta pesante. Si sente in colpa — ma non abbastanza da rimetterla al suo posto.",
            "onArrive": [
                {
                    "type": "setFlag",
                    "flag": "hasWestWingKey",
                    "value": true
                },
                {
                    "type": "addItem",
                    "id": "chiave_ala_ovest",
                    "name": "Chiave dell'Ala Ovest",
                    "desc": "Ferro battuto, pesante, fredda al tatto.",
                    "examine": "Una chiave antica, di fattura non recente. Il ferro è freddo anche tenuto in mano a lungo — più freddo di quanto la temperatura della stanza giustifichi."
                },
                {
                    "type": "modifyStat",
                    "stat": "fiducia",
                    "delta": -2
                },
                {
                    "type": "addLog",
                    "title": "LA CHIAVE SOTTRATTA",
                    "entry": "Trovata di nascosto nello studio di Edmund. Un peso sulla coscienza, ma un passo avanti."
                },
                {
                    "type": "playSfx",
                    "sfx": "act2_oggetto"
                }
            ],
            "options": [
                {
                    "text": "> Vai alla porta dell'ala ovest",
                    "target": "act2_westwing_threshold"
                }
            ]
        },
        "act2_key_pick_lock": {
            "location": "ALA OVEST — PORTA SIGILLATA",
            "text": "Arthur si inginocchia davanti al lucchetto, tirando fuori dalla borsa medica un paio di strumenti chirurgici sottili — non fatti per quello scopo, ma sufficientemente simili a dei grimaldelli da poter funzionare, forse.",
            "options": [
                {
                    "text": "> Tenta di forzare la serratura",
                    "target": "act2_westwing_threshold",
                    "effects": [
                        {
                            "type": "setFlag",
                            "flag": "pickAttempted",
                            "value": true
                        }
                    ],
                    "skillCheck": {
                        "stat": "indagine",
                        "difficulty": 8,
                        "success": "act2_key_pick_success",
                        "failure": "act2_key_pick_fail"
                    }
                }
            ]
        },
        "act2_key_pick_success": {
            "location": "ALA OVEST — PORTA SIGILLATA",
            "text": "Con un ultimo scatto secco, il meccanismo cede. Arthur si rialza, il cuore che batte forte più per l'adrenalina che per lo sforzo — ha appena scassinato una serratura in casa di un amico, e in qualche modo questo pensiero lo diverte quasi, nel mezzo di tutto il resto.",
            "onArrive": [
                {
                    "type": "setFlag",
                    "flag": "hasWestWingKey",
                    "value": true
                },
                {
                    "type": "addLog",
                    "title": "SERRATURA FORZATA",
                    "entry": "Nessuna chiave: solo pazienza, mano ferma e gli strumenti sbagliati usati nel modo giusto."
                },
                {
                    "type": "playSfx",
                    "sfx": "act2_lucchetto_forzato"
                }
            ],
            "options": [
                {
                    "text": "> Entra nell'ala ovest",
                    "target": "act2_westwing_threshold"
                }
            ]
        },
        "act2_key_pick_fail": {
            "location": "ALA OVEST — PORTA SIGILLATA",
            "text": "Gli strumenti scivolano, il meccanismo non cede, e uno schiocco metallico troppo rumoroso rimbomba nel corridoio deserto. Arthur si blocca, il fiato sospeso, aspettando passi che non arrivano. Il lucchetto, però, resta ostinatamente chiuso. Serve un'altra strada.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "TENTATIVO FALLITO",
                    "entry": "Il lucchetto non ha ceduto. Rumore pericoloso, nessun risultato."
                }
            ],
            "onArriveOnce": [
                {
                    "type": "modifyStat",
                    "stat": "nervi",
                    "delta": -1
                }
            ],
            "options": [
                {
                    "text": "> Cerca un'altra via per procurarti la chiave",
                    "target": "act2_key_search_intro"
                }
            ]
        },
        "act2_westwing_threshold": {
            "location": "ALA OVEST — PORTA SIGILLATA",
            "music": "act2_threshold",
            "theme": {
                "colorMain": "#7a6bb0",
                "colorDim": "#4a3f7a"
            },
            "art": "<svg viewBox=\"0 0 300 150\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"var(--color-main)\" fill=\"none\" stroke-width=\"2\">\n                <rect x=\"90\" y=\"15\" width=\"120\" height=\"130\" />\n                <rect x=\"95\" y=\"20\" width=\"110\" height=\"120\" />\n                <circle cx=\"180\" cy=\"80\" r=\"6\" />\n                <line x1=\"186\" y1=\"80\" x2=\"230\" y2=\"80\" />\n                <rect x=\"225\" y=\"65\" width=\"30\" height=\"30\" />\n                <circle cx=\"240\" cy=\"80\" r=\"4\" fill=\"var(--color-main)\" stroke=\"none\" />\n            </svg>",
            "text": "La chiave entra nella serratura con una precisione che sembra quasi innaturale, come se la porta stesse solo aspettando di essere aperta. Il meccanismo cede con un rumore secco che riecheggia lungo tutto il corridoio silenzioso. Al di là, solo buio — e una corrente d'aria fredda che sembra esalare dalla casa stessa, come un respiro trattenuto per troppo tempo.\n\n[FINE DELL'ATTO II — continua nell'Atto III]",
            "onArrive": [
                {
                    "type": "playSfx",
                    "sfx": "act2_chiave_gira"
                }
            ],
            "options": [
                {
                    "text": "> Fine dell'Atto II — prosegui nell'Atto III",
                    "target": "act3_westwing_corridor"
                }
            ]
        },
        "act3_westwing_corridor": {
            "location": "ALA OVEST — CORRIDOIO",
            "music": "act3_westwing",
            "theme": {
                "colorMain": "#7a6bb0",
                "colorDim": "#4a3f7a"
            },
            "art": "<svg viewBox=\"0 0 300 140\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"var(--color-main)\" fill=\"none\" stroke-width=\"2\">\n                <path d=\"M10,140 L10,20 L290,20 L290,140\" />\n                <line x1=\"60\" y1=\"140\" x2=\"60\" y2=\"20\" />\n                <line x1=\"120\" y1=\"140\" x2=\"120\" y2=\"20\" />\n                <line x1=\"180\" y1=\"140\" x2=\"180\" y2=\"20\" />\n                <line x1=\"240\" y1=\"140\" x2=\"240\" y2=\"20\" />\n                <path d=\"M40,140 Q120,130 260,110\" stroke-dasharray=\"3,4\" />\n                <rect x=\"250\" y=\"55\" width=\"35\" height=\"60\" />\n            </svg>",
            "text": "Oltre la soglia, il corridoio dell'ala ovest è sepolto sotto uno strato di polvere indisturbata da anni — tranne che per un sentiero, un'unica linea più chiara nel grigiore, che conduce dritta verso una porta in fondo. Qualcuno, regolarmente, cammina fin qui. Solo fin qui.",
            "onArrive": [
                {
                    "type": "setFlag",
                    "flag": "enteredLab",
                    "value": false
                },
                {
                    "type": "addLog",
                    "title": "L'ALA OVEST",
                    "entry": "Polvere ovunque, tranne un sentiero che conduce a un'unica porta. Qualcuno lo percorre regolarmente."
                }
            ],
            "options": [
                {
                    "text": "> Segui il sentiero nella polvere",
                    "target": "act3_lab_entrance"
                }
            ]
        },
        "act3_lab_entrance": {
            "location": "ALA OVEST — PORTA DELLO STUDIO",
            "text": "La porta in fondo al corridoio è socchiusa, e da dentro filtra un'aria fredda che non ha nulla a che vedere con la temperatura del resto della casa — come se quella stanza non fosse mai stata davvero riscaldata, in tutti gli anni trascorsi da quando è stata sigillata.",
            "options": [
                {
                    "text": "> Entra",
                    "target": "act3_lab_examine"
                }
            ]
        },
        "act3_lab_examine": {
            "location": "LABORATORIO DI LORD JOSIAH",
            "music": "act3_lab",
            "theme": {
                "colorMain": "#8b6bb0",
                "colorDim": "#4a3f6a"
            },
            "text": "La stanza è rimasta esattamente come Josiah Ashcombe l'ha lasciata: scaffali di libri proibiti, un tavolo da lavoro ingombro di strumenti dallo scopo poco chiaro, e — inciso nel legno del pavimento, profondo e deliberato — un ampio cerchio circondato da simboli che Arthur non riconosce, ma che gli fanno accapponare la pelle comunque.",
            "onArrive": [
                {
                    "type": "setFlag",
                    "flag": "enteredLab",
                    "value": true
                },
                {
                    "type": "addLog",
                    "title": "IL LABORATORIO",
                    "entry": "La stanza sigillata di Josiah Ashcombe: un cerchio rituale inciso nel pavimento, strumenti di scopo ignoto."
                }
            ],
            "options": [
                {
                    "text": "> Osserva il cerchio inciso nel pavimento",
                    "target": "act3_lab_symbols",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedCircle",
                        "equals": false
                    }
                },
                {
                    "text": "> Osserva il cerchio inciso nel pavimento",
                    "target": "act3_lab_symbols_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedCircle"
                    }
                },
                {
                    "text": "> Esamina gli strumenti sul tavolo da lavoro",
                    "target": "act3_lab_apparatus",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedApparatus",
                        "equals": false
                    }
                },
                {
                    "text": "> Esamina gli strumenti sul tavolo da lavoro",
                    "target": "act3_lab_apparatus_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedApparatus"
                    }
                },
                {
                    "text": "> C'è un baule di ferro chiuso in un angolo",
                    "target": "act3_chest",
                    "condition": {
                        "type": "flag",
                        "flag": "chestOpened",
                        "equals": false
                    }
                },
                {
                    "text": "> C'è un baule di ferro chiuso in un angolo",
                    "target": "act3_chest_already_open",
                    "condition": {
                        "type": "flag",
                        "flag": "chestOpened"
                    }
                },
                {
                    "text": "> Fruga tra le carte sulla scrivania",
                    "target": "act3_lab_desk",
                    "condition": {
                        "type": "flag",
                        "flag": "readSecondDiary",
                        "equals": false
                    }
                },
                {
                    "text": "> Fruga tra le carte sulla scrivania",
                    "target": "act3_lab_desk_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "readSecondDiary"
                    }
                }
            ]
        },
        "act3_lab_desk_revisited": {
            "location": "LABORATORIO DI LORD JOSIAH — LA SCRIVANIA",
            "text": "Il resto delle carte sulla scrivania sono appunti sparsi, poco più che promemoria illeggibili. Il diario che contava, Arthur lo ha già preso.",
            "options": [
                {
                    "text": "> Torna a considerare la stanza",
                    "target": "act3_lab_examine"
                }
            ]
        },
        "act3_chest_already_open": {
            "location": "LABORATORIO DI LORD JOSIAH — IL BAULE",
            "text": "Il baule è già aperto, il coperchio sollevato esattamente come Arthur lo ha lasciato. Non c'è altro da trovarci.",
            "options": [
                {
                    "text": "> Torna a considerare la stanza",
                    "target": "act3_lab_examine"
                }
            ]
        },
        "act3_lab_symbols": {
            "location": "LABORATORIO DI LORD JOSIAH",
            "text": "Il cerchio è tracciato con una precisione quasi ossessiva, i simboli ripetuti a intervalli regolari — non decorazione, ma struttura. Al centro, una macchia scura è penetrata così a fondo nel legno che nessuna pulizia potrebbe mai davvero rimuoverla.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "IL CERCHIO",
                    "entry": "Simboli ripetuti con precisione ossessiva. Al centro, una macchia scura permanente nel legno."
                }
            ],
            "onArriveOnce": [
                {
                    "type": "modifyStat",
                    "stat": "nervi",
                    "delta": -1
                },
                {
                    "type": "setFlag",
                    "flag": "examinedCircle",
                    "value": true
                }
            ],
            "options": [
                {
                    "text": "> Torna a considerare la stanza",
                    "target": "act3_lab_examine"
                }
            ]
        },
        "act3_lab_apparatus": {
            "location": "LABORATORIO DI LORD JOSIAH",
            "text": "Boccette annerite dal tempo, erbe essiccate che riconosce dalla serra abbandonata in giardino, e uno strumento di ottone dalla funzione indecifrabile — qualcosa a metà tra uno strumento scientifico e un oggetto rituale, come se per Josiah la distinzione non fosse mai stata così netta.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "GLI STRUMENTI DI JOSIAH",
                    "entry": "Erbe della stessa serra abbandonata, uno strumento di ottone tra scienza e rito."
                }
            ],
            "onArriveOnce": [
                {
                    "type": "modifyStat",
                    "stat": "indagine",
                    "delta": 1
                },
                {
                    "type": "setFlag",
                    "flag": "examinedApparatus",
                    "value": true
                }
            ],
            "options": [
                {
                    "text": "> Torna a considerare la stanza",
                    "target": "act3_lab_examine"
                }
            ]
        },
        "act3_chest": {
            "location": "LABORATORIO DI LORD JOSIAH — IL BAULE",
            "text": "Un baule di ferro battuto, più recente del resto dell'arredamento, chiuso da un meccanismo complesso che non sembra una semplice serratura.",
            "options": [
                {
                    "text": "> Forza il coperchio con la forza bruta",
                    "target": "act3_chest_danger"
                },
                {
                    "text": "> Osserva con attenzione il meccanismo, prima di agire",
                    "target": "act3_lab_examine",
                    "skillCheck": {
                        "stat": "indagine",
                        "difficulty": 7,
                        "success": "act3_chest_success",
                        "failure": "act3_chest_fail"
                    }
                },
                {
                    "text": "> Lascialo perdere, per ora",
                    "target": "act3_lab_examine"
                }
            ]
        },
        "act3_chest_danger": {
            "location": "LABORATORIO DI LORD JOSIAH — IL BAULE",
            "music": "act3_ending_death",
            "theme": {
                "colorMain": "#8b1e1e",
                "colorDim": "#4a0f0f"
            },
            "text": "Il coperchio cede di scatto sotto la forza — e con esso un meccanismo a molla nascosto, un ago avvelenato che si conficca profondamente nel palmo di Arthur prima che possa ritrarre la mano. Riconosce il sapore metallico che gli sale in gola quasi subito: uno dei composti della serra di Josiah, non certo innocuo. Non c'è tempo per raggiungere la sua borsa medica prima che tutto si faccia buio.\n\n[FINALE PREMATURO — IL BAULE AVVELENATO]",
            "onArrive": [
                {
                    "type": "playSfx",
                    "sfx": "act3_trappola"
                }
            ],
            "options": [
                {
                    "text": "> Torna al Menu Principale",
                    "target": "__mainMenu__"
                }
            ]
        },
        "act3_chest_success": {
            "location": "LABORATORIO DI LORD JOSIAH — IL BAULE",
            "text": "Studiando il meccanismo con calma, Arthur individua un piccolo fermo nascosto sotto il bordo — non una serratura da forzare, ma da capire. Il baule si apre senza resistenza, rivelando altri documenti di famiglia e un pesante anello con lo stemma degli Ashcombe, mai indossato da nessuno negli ultimi anni.",
            "onArrive": [
                {
                    "type": "playSfx",
                    "sfx": "act3_meccanismo"
                }
            ],
            "onArriveOnce": [
                {
                    "type": "setFlag",
                    "flag": "chestOpened",
                    "value": true
                },
                {
                    "type": "addItem",
                    "id": "anello_ashcombe",
                    "name": "Anello degli Ashcombe",
                    "desc": "Pesante, con lo stemma di famiglia.",
                    "examine": "Un anello d'oro annerito, mai indossato da generazioni a giudicare dalla polvere. Lo stemma raffigura un albero contorto — non i tipici simboli araldici, ma qualcosa che assomiglia più a un albero del bosco dietro casa."
                },
                {
                    "type": "addLog",
                    "title": "IL BAULE APERTO",
                    "entry": "Documenti di famiglia e un anello con lo stemma Ashcombe, mai indossato da anni."
                }
            ],
            "options": [
                {
                    "text": "> Torna a considerare la stanza",
                    "target": "act3_lab_examine"
                }
            ]
        },
        "act3_chest_fail": {
            "location": "LABORATORIO DI LORD JOSIAH — IL BAULE",
            "text": "Il meccanismo resta un mistero. Arthur non riesce a individuare come aprirlo senza rischiare di forzarlo — meglio lasciar perdere, per ora, piuttosto che tentare la sorte.",
            "options": [
                {
                    "text": "> Torna a considerare la stanza",
                    "target": "act3_lab_examine"
                }
            ]
        },
        "act3_lab_desk": {
            "location": "LABORATORIO DI LORD JOSIAH — LA SCRIVANIA",
            "text": "Sotto una pila di carte ingiallite, Arthur trova un secondo diario — più recente del primo, la calligrafia meno formale, quasi frettolosa in alcuni punti. Non è opera di Josiah: è di suo figlio, il primo a dover davvero fare i conti con l'eredità che il padre gli aveva lasciato.",
            "onArrive": [
                {
                    "type": "playSfx",
                    "sfx": "act3_pergamena"
                }
            ],
            "onArriveOnce": [
                {
                    "type": "addItem",
                    "id": "diario_josiah",
                    "name": "Secondo Diario",
                    "desc": "Più recente, più esplicito, terribilmente chiaro.",
                    "examine": "'Mio padre lo chiamava un dono. Io lo chiamo per quello che è: un debito. Nel bosco dietro casa, tre generazioni fa, ha promesso qualcosa in cambio di ricchezza e discendenza sicura — e ogni due generazioni, quel qualcosa reclama la sua parte. Un primogenito, offerto nella cappella, o l'alternativa: che la cosa si prenda comunque ciò che vuole, lentamente, divorando la mente di chi le sta più vicino. Non è follia di famiglia. È fame, che si nutre di chi rifiuta di pagare.'"
                },
                {
                    "type": "setFlag",
                    "flag": "readSecondDiary",
                    "value": true
                },
                {
                    "type": "addLog",
                    "title": "IL SECONDO DIARIO",
                    "entry": "Il patto, spiegato senza ambiguità: un primogenito ogni due generazioni, offerto nella cappella — o la 'fame' si prende comunque chi le sta vicino, lentamente."
                }
            ],
            "options": [
                {
                    "text": "> Continua a esaminare la stanza",
                    "target": "act3_lab_examine"
                },
                {
                    "text": "> È tempo di parlare con Edmund",
                    "target": "act3_confront_edmund_intro"
                }
            ]
        },
        "act3_confront_edmund_intro": {
            "location": "SALOTTO PRINCIPALE — PRIMO POMERIGGIO",
            "music": "act3_confrontation",
            "theme": {
                "colorMain": "#b08a4a",
                "colorDim": "#6a5228"
            },
            "text": "Edmund è dove Arthur lo ha lasciato, ma qualcosa nel suo sguardo cambia non appena vede il diario in mano all'amico. Non c'è più sorpresa da nascondere — solo la domanda, tacita, di cosa succederà adesso.",
            "options": [
                {
                    "text": "> Mostragli il diario e chiedigli la verità, da amico a amico",
                    "target": "act3_edmund_confession",
                    "condition": {
                        "type": "stat",
                        "stat": "fiducia",
                        "op": ">=",
                        "value": 7
                    }
                },
                {
                    "text": "> Mettilo alle strette con quello che hai scoperto",
                    "target": "act3_edmund_denial",
                    "condition": {
                        "type": "stat",
                        "stat": "fiducia",
                        "op": "<",
                        "value": 7
                    }
                }
            ]
        },
        "act3_edmund_confession": {
            "location": "SALOTTO PRINCIPALE — PRIMO POMERIGGIO",
            "text": "Edmund non nega nulla. Si siede pesantemente, il viso tra le mani, e per la prima volta da quando Arthur è arrivato racconta tutto senza reticenze: il patto, il prezzo, il fatto che tocchi a lui — e che ha passato l'ultimo anno cercando disperatamente un modo per romperlo senza pagarlo. 'Volevo dirtelo subito. Non sapevo come. Non sapevo se avresti anche solo potuto crederci.'",
            "onArrive": [
                {
                    "type": "setFlag",
                    "flag": "edmundFullConfession",
                    "value": true
                },
                {
                    "type": "modifyStat",
                    "stat": "fiducia",
                    "delta": 2
                },
                {
                    "type": "addLog",
                    "title": "LA CONFESSIONE",
                    "entry": "Edmund racconta tutto apertamente: il patto, il prezzo, il suo tentativo disperato di trovare un'alternativa."
                }
            ],
            "options": [
                {
                    "text": "> Prosegui",
                    "target": "act3_tonight_revelation"
                }
            ]
        },
        "act3_edmund_denial": {
            "location": "SALOTTO PRINCIPALE — PRIMO POMERIGGIO",
            "text": "'È solo una vecchia superstizione di famiglia,' tenta Edmund, la voce troppo tesa per essere convincente. Ma quando Arthur elenca, uno per uno, gli appunti trovati, le tombe senza nome, il diario stesso — la resistenza di Edmund si sgretola, non in confessione serena ma in un crollo amaro. 'Bene. Sì. È tutto vero. Sei contento adesso?' Non è gratitudine, quella nella sua voce. È rabbia, mescolata a un sollievo che non riesce a nascondere del tutto.",
            "onArrive": [
                {
                    "type": "setFlag",
                    "flag": "edmundDenialPath",
                    "value": true
                },
                {
                    "type": "modifyStat",
                    "stat": "fiducia",
                    "delta": -2
                },
                {
                    "type": "addLog",
                    "title": "LA VERITÀ STRAPPATA",
                    "entry": "Messo alle strette dalle prove, Edmund ammette tutto — ma con rabbia, non sollievo."
                }
            ],
            "options": [
                {
                    "text": "> Prosegui",
                    "target": "act3_tonight_revelation"
                }
            ]
        },
        "act3_tonight_revelation": {
            "location": "SALOTTO PRINCIPALE — POMERIGGIO INOLTRATO",
            "music": "act3_storm",
            "theme": {
                "colorMain": "#5a5a7a",
                "colorDim": "#33334a"
            },
            "text": "Contando le generazioni, facendo i conti con le date del diario, la conclusione è inevitabile: il rinnovo del patto è dovuto stanotte. Fuori dalle finestre, un temporale si sta addensando con una rapidità che non ha nulla di naturale per la stagione — come se il tempo stesso avesse fretta di arrivare a una scadenza.",
            "onArrive": [
                {
                    "type": "setFlag",
                    "flag": "knowsTonightIsNight",
                    "value": true
                },
                {
                    "type": "addLog",
                    "title": "STANOTTE",
                    "entry": "Il rinnovo del patto è dovuto stanotte. Una tempesta innaturalmente rapida si sta addensando fuori."
                },
                {
                    "type": "playSfx",
                    "sfx": "act3_tuono"
                },
                {
                    "type": "playSfx",
                    "sfx": "act3_rivelazione"
                }
            ],
            "options": [
                {
                    "text": "> Cerca di vedere come sta Constance, prima che sia troppo tardi",
                    "target": "act3_constance_crisis"
                },
                {
                    "text": "> Prenditi un momento per prepararti a quello che verrà",
                    "target": "act3_act3_close"
                }
            ]
        },
        "act3_constance_crisis": {
            "location": "STANZA DI CONSTANCE",
            "music": "act3_constance",
            "theme": {
                "colorMain": "#7a8fb0",
                "colorDim": "#3f4a6a"
            },
            "text": "Constance è seduta composta accanto alla finestra, e per la prima volta non sembra spaventata — sembra stranamente lucida, quasi in pace. 'Lo sento arrivare,' dice, senza girarsi. 'Stanotte sarà più vicino di quanto sia mai stato. Non per me, dottore. Per lui.' Il modo in cui lo dice, calmo e terribile insieme, resta con Arthur molto più a lungo di qualunque urlo.",
            "onArrive": [
                {
                    "type": "setFlag",
                    "flag": "witnessedConstanceCrisis",
                    "value": true
                },
                {
                    "type": "addLog",
                    "title": "CONSTANCE, STANOTTE",
                    "entry": "'Lo sento arrivare. Stanotte sarà più vicino di quanto sia mai stato. Non per me. Per lui.'"
                }
            ],
            "onArriveOnce": [
                {
                    "type": "modifyStat",
                    "stat": "nervi",
                    "delta": -2
                }
            ],
            "options": [
                {
                    "text": "> Esci, il tempo stringe",
                    "target": "act3_act3_close"
                }
            ]
        },
        "act3_act3_close": {
            "location": "BLACKTHORN HALL — VERSO SERA",
            "text": "Il temporale si avvicina mentre la luce del giorno si spegne prematuramente dietro le nuvole. Arthur conosce ora la forma di ciò che lo aspetta stanotte, anche se non ancora come fermarlo. In casa, ogni ombra sembra più densa del solito — come se anche le pareti stessero trattenendo il fiato.\n\n[FINE DELL'ATTO III — continua nell'Atto IV]",
            "options": [
                {
                    "text": "> Fine dell'Atto III — prosegui nell'Atto IV",
                    "target": "act4_storm_night_start"
                }
            ]
        },
        "act4_storm_night_start": {
            "location": "BLACKTHORN HALL — NOTTE DI TEMPESTA",
            "music": "act4_storm",
            "theme": {
                "colorMain": "#5a5a7a",
                "colorDim": "#2a2a45"
            },
            "art": "<svg viewBox=\"0 0 300 150\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"var(--color-main)\" fill=\"none\" stroke-width=\"2\">\n                <rect x=\"40\" y=\"40\" width=\"220\" height=\"110\" />\n                <path d=\"M60,150 L90,80 L75,80 L100,20 L85,55 L105,55 L70,150\" fill=\"var(--color-main)\" stroke=\"none\" opacity=\"0.7\" />\n                <line x1=\"20\" y1=\"30\" x2=\"35\" y2=\"55\" />\n                <line x1=\"270\" y1=\"20\" x2=\"255\" y2=\"45\" />\n                <path d=\"M40,100 Q150,90 260,100\" stroke-dasharray=\"4,4\" />\n            </svg>",
            "text": "Un tuono esplode così vicino che le finestre vibrano nei telai. Arthur si sveglia di scatto — non dal sonno leggero di prima, ma da un buio profondo, come se qualcosa avesse voluto tenerlo sotto più a lungo del dovuto. Fuori, la tempesta non è più in arrivo: è già sopra la casa, furiosa, innaturale nella sua violenza.",
            "onArrive": [
                {
                    "type": "playSfx",
                    "sfx": "act4_tuono"
                },
                {
                    "type": "addLog",
                    "title": "LA TEMPESTA",
                    "entry": "La tempesta è esplosa sulla casa con una violenza innaturale. È la notte del rinnovo del patto."
                }
            ],
            "options": [
                {
                    "text": "> Corri a controllare Constance",
                    "target": "act4_constance_missing"
                }
            ]
        },
        "act4_constance_missing": {
            "location": "STANZA DI CONSTANCE",
            "text": "La porta è spalancata. La stanza è vuota. La finestra sbatte contro il muro esterno a ogni raffica, i vetri di una delle ante in frantumi sul pavimento — non forzata dall'esterno, ma spalancata dall'interno, con urgenza. Di Constance, nessuna traccia se non una vestaglia abbandonata sul letto disfatto.",
            "onArrive": [
                {
                    "type": "setFlag",
                    "flag": "constanceMissing",
                    "value": true
                },
                {
                    "type": "playSfx",
                    "sfx": "act4_vetro_rotto"
                },
                {
                    "type": "addLog",
                    "title": "CONSTANCE È SCOMPARSA",
                    "entry": "La sua stanza è vuota, la finestra spalancata dall'interno. È uscita nella tempesta."
                },
                {
                    "type": "modifyStat",
                    "stat": "nervi",
                    "delta": -1
                }
            ],
            "options": [
                {
                    "text": "> Decidi cosa fare",
                    "target": "act4_decision_hub"
                }
            ]
        },
        "act4_decision_hub": {
            "location": "CORRIDOIO PRINCIPALE — NOTTE DI TEMPESTA",
            "text": "Il tempo stringe, e Arthur non può fare tutto insieme. Deve scegliere: cercare subito Constance nella tempesta, correre a fermare Edmund prima che raggiunga la cappella, oppure andare lui stesso alla cappella per cercare un modo di interrompere il rito prima che qualcuno vi arrivi.",
            "options": [
                {
                    "text": "> Esci subito nella tempesta a cercare Constance",
                    "target": "act4_grounds_storm_search"
                },
                {
                    "text": "> Corri a fermare Edmund prima che parta",
                    "target": "act4_edmund_departure"
                },
                {
                    "text": "> Va' tu stesso alla cappella, a cercare un modo per interrompere il rito",
                    "target": "act4_gather_tools"
                }
            ]
        },
        "act4_grounds_storm_search": {
            "location": "GIARDINO — NOTTE DI TEMPESTA",
            "text": "Il giardino è irriconoscibile sotto la pioggia battente, i rovi che si aggrappano ai vestiti, il fango che rende ogni passo un'incognita. Ma nel fango, appena visibile prima che la pioggia lo cancelli, Arthur individua delle impronte — piccole, scalze, dirette verso il bosco.",
            "onArrive": [
                {
                    "type": "setFlag",
                    "flag": "searchedGroundsFirst",
                    "value": true
                },
                {
                    "type": "addLog",
                    "title": "LE IMPRONTE NEL FANGO",
                    "entry": "Impronte scalze nel fango, dirette verso il bosco e la cappella."
                },
                {
                    "type": "playSfx",
                    "sfx": "act4_passi_corsa"
                }
            ],
            "options": [
                {
                    "text": "> Segui le impronte verso il bosco",
                    "target": "act4_stream_crossing"
                }
            ]
        },
        "act4_stream_crossing": {
            "location": "IL TORRENTE IN PIENA",
            "text": "Il sentiero verso il bosco è tagliato da un torrente che in condizioni normali sarebbe un rigagnolo, ma che la tempesta ha trasformato in una corrente violenta e marrone. Un vecchio ponticello di assi attraversa il punto più stretto, scricchiolando visibilmente a ogni raffica.",
            "onArrive": [
                {
                    "type": "playSfx",
                    "sfx": "act4_acqua_impetuosa"
                }
            ],
            "options": [
                {
                    "text": "> Attraversa di corsa, non c'è tempo da perdere",
                    "target": "act4_stream_danger"
                },
                {
                    "text": "> Cerca un punto più sicuro per guadare, con calma",
                    "target": "act4_stream_safe",
                    "skillCheck": {
                        "stat": "indagine",
                        "difficulty": 6,
                        "success": "act4_stream_safe",
                        "failure": "act4_stream_delay"
                    }
                }
            ]
        },
        "act4_stream_danger": {
            "location": "IL TORRENTE IN PIENA",
            "music": "act4_ending_death",
            "theme": {
                "colorMain": "#2a4a6a",
                "colorDim": "#15253a"
            },
            "text": "A metà del ponticello, un'asse marcia cede sotto il suo peso. Arthur precipita nella corrente gelida, e la furia dell'acqua è più forte di qualunque bracciata — lo trascina, lo sbatte contro pietre invisibili, gli riempie i polmoni prima che possa anche solo gridare. La tempesta si porta via ogni traccia di lui prima dell'alba.\n\n[FINALE PREMATURO — LA CORRENTE]",
            "onArrive": [
                {
                    "type": "playSfx",
                    "sfx": "act4_annegamento"
                }
            ],
            "options": [
                {
                    "text": "> Torna al Menu Principale",
                    "target": "__mainMenu__"
                }
            ]
        },
        "act4_stream_safe": {
            "location": "IL TORRENTE IN PIENA",
            "text": "Pochi passi più a monte, Arthur individua un punto dove il torrente si allarga e rallenta — più lento, meno profondo, sicuro da guadare con attenzione. Fradicio fino alle ossa ma incolume, raggiunge l'altra sponda e ritrova le impronte, ormai quasi cancellate dalla pioggia, dirette verso la cappella.",
            "options": [
                {
                    "text": "> Prosegui verso il bosco",
                    "target": "act4_woods_approach"
                }
            ]
        },
        "act4_stream_delay": {
            "location": "IL TORRENTE IN PIENA",
            "text": "Non trova un punto più sicuro in tempo utile — la corrente sembra ugualmente furiosa ovunque guardi. Alla fine attraversa comunque il ponticello, più lentamente e con più cautela della prima volta che ci aveva pensato, e questa volta le assi reggono.",
            "options": [
                {
                    "text": "> Prosegui verso il bosco",
                    "target": "act4_woods_approach"
                }
            ]
        },
        "act4_edmund_departure": {
            "location": "INGRESSO DI BLACKTHORN HALL — NOTTE DI TEMPESTA",
            "text": "Arthur lo raggiunge proprio mentre Edmund si sta infilando un cappotto fradicio, una lanterna già accesa in mano. Non sembra sorpreso di essere stato scoperto. 'Non puoi fermarmi, Arthur. E non puoi venire con me.'",
            "onArrive": [
                {
                    "type": "setFlag",
                    "flag": "confrontedEdmundFirst",
                    "value": true
                },
                {
                    "type": "addLog",
                    "title": "EDMUND STA PER PARTIRE",
                    "entry": "Arthur lo intercetta all'ingresso, già pronto per raggiungere la cappella da solo."
                }
            ],
            "options": [
                {
                    "text": "> Insisti: qualunque cosa sia, la affronterete insieme",
                    "target": "act4_edmund_final_words"
                }
            ]
        },
        "act4_edmund_final_words": {
            "location": "INGRESSO DI BLACKTHORN HALL — NOTTE DI TEMPESTA",
            "text": "Per un lungo istante Edmund sembra sul punto di rifiutare di nuovo. Poi qualcosa in lui cede — non resa, ma sollievo, lo stesso che Arthur ha già visto altre volte in questi giorni. 'Va bene,' dice infine, la voce rotta dal vento. 'Ma quando arriveremo là, fai esattamente quello che ti dico. Non per orgoglio, Arthur. Per restare vivo.'",
            "onArrive": [
                {
                    "type": "setFlag",
                    "flag": "edmundWentTogether",
                    "value": true
                },
                {
                    "type": "modifyStat",
                    "stat": "fiducia",
                    "delta": 1
                },
                {
                    "type": "addLog",
                    "title": "INSIEME",
                    "entry": "Edmund accetta che Arthur lo accompagni alla cappella."
                }
            ],
            "options": [
                {
                    "text": "> Uscite insieme nella tempesta",
                    "target": "act4_woods_approach"
                }
            ]
        },
        "act4_gather_tools": {
            "location": "BLACKTHORN HALL — NOTTE DI TEMPESTA",
            "text": "Prima di uscire, Arthur si ferma un istante a pensare a cosa potrebbe davvero servire — non un'arma, ma qualcosa che sappia di più di lui su questa casa e sul suo debito.",
            "onArrive": [
                {
                    "type": "setFlag",
                    "flag": "preparedAtChapelFirst",
                    "value": true
                }
            ],
            "options": [
                {
                    "text": "> Prendi l'anello degli Ashcombe: forse conta ancora qualcosa, per la cosa nel bosco",
                    "target": "act4_chapel_prep_result",
                    "condition": {
                        "type": "item",
                        "item": "anello_ashcombe",
                        "quantity": 1
                    }
                },
                {
                    "text": "> Porta con te il diario: la conoscenza sarà l'unica arma disponibile",
                    "target": "act4_chapel_prep_result"
                }
            ]
        },
        "act4_chapel_prep_result": {
            "location": "BLACKTHORN HALL — NOTTE DI TEMPESTA",
            "text": "Non è molto, ma è quello che ha. Arthur esce nella tempesta da solo, diretto verso il bosco, sapendo che potrebbe arrivare prima di chiunque altro — per bene o per male.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "VERSO LA CAPPELLA",
                    "entry": "Arthur si dirige da solo verso la cappella, prima ancora di sapere dove siano Edmund e Constance."
                }
            ],
            "options": [
                {
                    "text": "> Avanza nella tempesta",
                    "target": "act4_woods_approach"
                }
            ]
        },
        "act4_woods_approach": {
            "location": "IL BOSCO — NOTTE DI TEMPESTA",
            "music": "act4_climax",
            "theme": {
                "colorMain": "#3a3a5a",
                "colorDim": "#1a1a30"
            },
            "text": "Gli alberi si piegano sotto il vento, i lampi squarciano il buio a intervalli sempre più brevi, e attraverso i rami Arthur scorge finalmente un bagliore innaturale — non una lanterna, qualcosa di più freddo — proveniente dalla cappella in fondo al sentiero.",
            "onArrive": [
                {
                    "type": "addLog",
                    "title": "LA LUCE NELLA CAPPELLA",
                    "entry": "Un bagliore freddo e innaturale proviene dalla cappella. Qualcuno — o qualcosa — è già lì."
                }
            ],
            "options": [
                {
                    "text": "> Avanza verso la cappella",
                    "target": "act4_chapel_arrival"
                }
            ]
        },
        "act4_chapel_arrival": {
            "location": "SOGLIA DELLA CAPPELLA — NOTTE DI TEMPESTA",
            "text": "Arthur raggiunge la soglia della cappella. Dentro, la luce fredda pulsa debolmente, e sagome che non riesce ancora a distinguere del tutto si muovono nel bagliore. Qualunque cosa stia per succedere, sta per succedere ora.\n\n[FINE DELL'ATTO IV — continua nell'Atto V]",
            "options": [
                {
                    "text": "> Fine dell'Atto IV — prosegui nell'Atto V",
                    "target": "act5_chapel_scene"
                }
            ]
        },
        "act5_chapel_scene": {
            "location": "INTERNO DELLA CAPPELLA — NOTTE DI TEMPESTA",
            "art": "<svg viewBox=\"0 0 300 150\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"var(--color-main)\" fill=\"none\" stroke-width=\"2\">\n                <circle cx=\"150\" cy=\"90\" r=\"55\" stroke-dasharray=\"4,3\" />\n                <circle cx=\"150\" cy=\"90\" r=\"3\" fill=\"var(--color-main)\" stroke=\"none\" />\n                <path d=\"M100,140 L100,60 L150,15 L200,60 L200,140\" />\n                <path d=\"M120,90 L145,75 L145,110\" fill=\"var(--color-main)\" stroke=\"none\" opacity=\"0.6\" />\n                <path d=\"M180,90 L155,105 L155,70\" fill=\"var(--color-main)\" stroke=\"none\" opacity=\"0.4\" />\n            </svg>",
            "text": "All'interno, il cerchio inciso nel pavimento della cappella pulsa di una luce fredda e senza fonte apparente. Edmund è in ginocchio al suo margine, il volto rigato di pioggia e lacrime insieme. Poco distante, Constance è immobile, gli occhi chiusi, come in un sonno che non è sonno. E oltre il cerchio, ai limiti della percezione, qualcosa si muove — non visto direttamente, ma presente, in attesa, da tre generazioni.",
            "onArrive": [
                {
                    "type": "playSfx",
                    "sfx": "act5_presenza"
                },
                {
                    "type": "addLog",
                    "title": "LA CAPPELLA",
                    "entry": "Edmund in ginocchio al margine del cerchio, Constance immobile, e qualcosa che aspetta, presente ma invisibile."
                }
            ],
            "options": [
                {
                    "text": "> Osserva la scena un istante, prima di agire",
                    "target": "act5_chapel_observe"
                },
                {
                    "text": "> Non c'è tempo: agisci subito",
                    "target": "act5_chapel_climax"
                }
            ]
        },
        "act5_chapel_observe": {
            "location": "INTERNO DELLA CAPPELLA — NOTTE DI TEMPESTA",
            "text": "Un istante di più, e Arthur nota che Edmund non sta recitando alcuna formula, non sta collaborando: sta resistendo, ogni muscolo teso contro una forza che lo tira verso il centro del cerchio suo malgrado. Non è un sacrificio volontario. È una cattura in corso.",
            "onArrive": [
                {
                    "type": "modifyStat",
                    "stat": "indagine",
                    "delta": 1
                },
                {
                    "type": "addLog",
                    "title": "EDMUND RESISTE",
                    "entry": "Non sta collaborando al rito: sta lottando contro una forza che lo trascina verso il cerchio."
                }
            ],
            "options": [
                {
                    "text": "> Agisci, ora",
                    "target": "act5_chapel_climax"
                }
            ]
        },
        "act5_chapel_climax": {
            "location": "INTERNO DELLA CAPPELLA — IL MOMENTO DECISIVO",
            "music": "act5_ritual",
            "theme": {
                "colorMain": "#6a3a8a",
                "colorDim": "#33184a"
            },
            "text": "Non c'è più tempo per pensare. Qualunque cosa Arthur decida, dovrà deciderla adesso.",
            "options": [
                {
                    "text": "> Offriti al posto di Edmund, consapevole di ciò che significa",
                    "target": "act5_ending_sacrifice",
                    "condition": {
                        "type": "stat",
                        "stat": "fiducia",
                        "op": ">=",
                        "value": 8
                    }
                },
                {
                    "text": "> Usa l'anello e ciò che hai appreso dal diario per spezzare il patto",
                    "target": "act5_ending_broken",
                    "condition": {
                        "all": [
                            {
                                "type": "item",
                                "item": "anello_ashcombe",
                                "quantity": 1
                            },
                            {
                                "type": "flag",
                                "flag": "readSecondDiary"
                            }
                        ]
                    }
                },
                {
                    "text": "> Intervieni con decisione per strappare Edmund alla presa, corpo e anima",
                    "target": "act5_ending_saved",
                    "condition": {
                        "all": [
                            {
                                "type": "stat",
                                "stat": "fiducia",
                                "op": ">=",
                                "value": 6
                            },
                            {
                                "type": "flag",
                                "flag": "readSecondDiary"
                            }
                        ]
                    }
                },
                {
                    "text": "> Afferra Edmund e trascinalo via: si fugge, subito",
                    "target": "act5_ending_flight"
                },
                {
                    "text": "> Gettati nel cerchio per fermarlo, senza sapere davvero cosa fare",
                    "target": "act5_ending_custode"
                }
            ]
        },
        "act5_ending_broken": {
            "location": "INTERNO DELLA CAPPELLA — ALL'ALBA",
            "music": "act5_ending_broken",
            "theme": {
                "colorMain": "#c9a227",
                "colorDim": "#7a5c2e"
            },
            "text": "L'anello degli Ashcombe non è un gioiello: è un sigillo, esattamente come suggeriva il diario. Arthur lo pone al centro del cerchio mentre recita, quasi a memoria ormai, le parole dell'iscrizione sulla porta della cappella — non una preghiera, ma la clausola di un contratto che nessuno aveva mai pensato di invocare fino in fondo.\n\nLa presenza ai margini del cerchio si ritira, non sconfitta ma soddisfatta di un pagamento diverso, definitivo. Edmund cade in avanti, libero, singhiozzando. Constance apre gli occhi, davvero sveglia per la prima volta da giorni.\n\nMa qualcosa, in Arthur, non torna più come prima. Da quella notte, percepirà sempre — ai margini della vista, ai margini del sonno — cose che nessun uomo di scienza dovrebbe percepire. Il prezzo non è stato pagato da Edmund. È stato spostato. Solo spostato.\n\n[FINALE — IL PATTO SPEZZATO]",
            "onArrive": [
                {
                    "type": "playSfx",
                    "sfx": "act5_rottura"
                }
            ],
            "options": [
                {
                    "text": "> Torna al Menu Principale",
                    "target": "__mainMenu__"
                }
            ]
        },
        "act5_ending_flight": {
            "location": "VIA DALLA CAPPELLA — ALL'ALBA",
            "music": "act5_ending_flight",
            "theme": {
                "colorMain": "#8a6a3a",
                "colorDim": "#4a3818"
            },
            "text": "Arthur non pensa al patto, ai diari, alle risposte. Pensa solo ad afferrare Edmund per le spalle e trascinarlo fuori dal cerchio, lontano dalla cappella, di corsa nella tempesta che finalmente comincia a placarsi verso l'alba.\n\nFunziona. In qualche modo, funziona: il rito resta incompiuto, e qualunque cosa attendesse nel bosco non li insegue oltre il limite degli alberi. Ma un rito interrotto non è un rito annullato. Nei mesi successivi, Arthur si sorprende a contare le generazioni, a chiedersi quando — non se — il conto tornerà a presentarsi, e su chi.\n\nConstance non guarisce mai del tutto. Nessuno, in casa Ashcombe, torna mai a dormire sereno.\n\n[FINALE — LA FUGA]",
            "onArrive": [
                {
                    "type": "playSfx",
                    "sfx": "act5_urlo_lontano"
                }
            ],
            "options": [
                {
                    "text": "> Torna al Menu Principale",
                    "target": "__mainMenu__"
                }
            ]
        },
        "act5_ending_custode": {
            "location": "DENTRO IL CERCHIO — NOTTE SENZA FINE",
            "music": "act5_ending_custode",
            "theme": {
                "colorMain": "#2a1a3a",
                "colorDim": "#150d1f"
            },
            "text": "Arthur si getta nel cerchio senza un piano, solo con la disperata volontà di interrompere qualunque cosa stia accadendo — e la presenza, per la prima volta, si volta davvero verso di lui.\n\nNon è rabbia, quello che sente. È interesse. Un'offerta volontaria, per quanto ignara, vale più di una presa forzata su un erede riluttante. Il legame si sposta, in un istante che dura insieme un secondo e tre generazioni, da Edmund ad Arthur.\n\nEdmund lo vede accadere, urla il suo nome, ma è già tardi. Quando il temporale si placa, Arthur è ancora in piedi, ancora se stesso — ma sa, con la stessa certezza con cui conosce il proprio nome, che ora è lui a dovere qualcosa al bosco dietro Blackthorn Hall. Non stanotte. Ma un giorno.\n\n[FINALE — IL NUOVO CUSTODE]",
            "onArrive": [
                {
                    "type": "playSfx",
                    "sfx": "act5_presenza"
                }
            ],
            "options": [
                {
                    "text": "> Torna al Menu Principale",
                    "target": "__mainMenu__"
                }
            ]
        },
        "act5_ending_saved": {
            "location": "INTERNO DELLA CAPPELLA — ALL'ALBA",
            "music": "act5_ending_saved",
            "theme": {
                "colorMain": "#5a8a6a",
                "colorDim": "#2a4a35"
            },
            "text": "Arthur sa esattamente cosa dice il diario, esattamente cosa significa quella resistenza nel corpo di Edmund. Non è forza fisica che serve — è interrompere la presa nel punto esatto in cui il rito diventa vincolante, un istante preciso che il testo di Josiah aveva descritto con orrore quasi clinico.\n\nArthur lo trova. Afferra Edmund proprio in quell'istante e lo strappa indietro, fuori dal cerchio, mentre la presenza ruggisce — non fisicamente, ma dentro la testa di Arthur, un suono che non dimenticherà mai per il resto dei suoi giorni.\n\nEdmund vive. Respira, tossisce, piange, ma vive. Il prezzo lo paga Arthur, in incubi che non lo lasceranno mai del tutto — ma quando guarda Edmund respirare accanto a sé, decide che è un prezzo che pagherebbe di nuovo, senza esitare.\n\n[FINALE — IL FRATELLO SALVATO]",
            "onArrive": [
                {
                    "type": "playSfx",
                    "sfx": "act5_respiro"
                }
            ],
            "options": [
                {
                    "text": "> Torna al Menu Principale",
                    "target": "__mainMenu__"
                }
            ]
        },
        "act5_ending_sacrifice": {
            "location": "DENTRO IL CERCHIO — ALL'ALBA",
            "music": "act5_ending_sacrifice",
            "theme": {
                "colorMain": "#d4c088",
                "colorDim": "#8a7a4a"
            },
            "text": "Arthur non esita. Non più. Spinge Edmund indietro, fuori dal margine del cerchio, e prende il suo posto con una calma che sorprende persino se stesso — l'unico gesto interamente suo, in giorni interi passati a rincorrere segreti altrui.\n\n'Arthur, no—' Ma è già fatto. La presenza accetta senza esitazione: non conta il sangue, conta la volontà offerta liberamente, e quella di Arthur è più pura di qualunque erede riluttante potesse mai offrire.\n\nEdmund vive. Constance guarisce, davvero, per la prima volta in anni. Blackthorn Hall, con l'alba, sembra quasi una casa qualunque. Ma in certe notti di tempesta, chi passa vicino al cancello arrugginito giura di scorgere, tra gli alberi, una figura immobile — non minacciosa, solo presente. Un medico di campagna che ha scelto, una volta, di restare.\n\n[FINALE — IL SACRIFICIO]",
            "onArrive": [
                {
                    "type": "playSfx",
                    "sfx": "act5_campana_finale"
                }
            ],
            "options": [
                {
                    "text": "> Torna al Menu Principale",
                    "target": "__mainMenu__"
                }
            ]
        },
        "act1_messenger_query_revisited": {
            "location": "STUDIO DEL DOTTOR WREN",
            "text": "Il messaggero è già ripartito, il compito assolto. Non c'è nessuno a cui chiedere altro, per ora.",
            "options": [
                {
                    "text": "> Guarda ancora un momento lo studio, prima di partire",
                    "target": "act1_study_details",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedStudy",
                        "equals": false
                    }
                },
                {
                    "text": "> Guarda ancora un momento lo studio, prima di partire",
                    "target": "act1_study_details_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "examinedStudy"
                    }
                },
                {
                    "text": "> Ripensa a come conobbe Edmund, tanti anni fa",
                    "target": "act1_university_memories",
                    "condition": {
                        "type": "flag",
                        "flag": "recalledUniversity",
                        "equals": false
                    }
                },
                {
                    "text": "> Ripensa a come conobbe Edmund, tanti anni fa",
                    "target": "act1_university_memories_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "recalledUniversity"
                    }
                },
                {
                    "text": "> Non c'è tempo da perdere: prepara i bagagli",
                    "target": "act1_packing"
                }
            ]
        },
        "act1_university_memories_revisited": {
            "location": "STUDIO DEL DOTTOR WREN",
            "text": "Il ricordo di Cambridge resta lo stesso di poco fa — non c'è bisogno di riviverlo una seconda volta.",
            "options": [
                {
                    "text": "> Prosegui",
                    "target": "act1_messenger_query",
                    "condition": {
                        "type": "flag",
                        "flag": "askedMessenger",
                        "equals": false
                    }
                },
                {
                    "text": "> Prosegui",
                    "target": "act1_messenger_query_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "askedMessenger"
                    }
                }
            ]
        },
        "act1_dinner_father_revisited": {
            "location": "SALA DA PRANZO",
            "text": "Edmund non ha altro da aggiungere sul padre. L'argomento, chiaramente, resta chiuso.",
            "options": [
                {
                    "text": "> Prosegui",
                    "target": "act1_dinner"
                }
            ]
        },
        "act1_room_details_revisited": {
            "location": "STANZA DEGLI OSPITI",
            "text": "La stanza resta quella di prima — il dipinto sbagliato, le tende pesanti. Niente di nuovo da scoprire qui.",
            "options": [
                {
                    "text": "> Prosegui",
                    "target": "act1_retiring"
                }
            ]
        },
        "act1_westwing_door_revisited": {
            "location": "ALA OVEST — PORTA SIGILLATA",
            "text": "La porta dell'ala ovest resta sigillata come prima, la stessa corrente fredda da sotto la soglia. Non c'è altro da fare qui, per ora.",
            "options": [
                {
                    "text": "> Prosegui",
                    "target": "act1_retiring"
                }
            ]
        },
        "act1_library_genealogy_revisited": {
            "location": "BIBLIOTECA — ALBERO GENEALOGICO",
            "text": "L'albero genealogico è sempre lì, aperto sulla stessa pagina. Arthur ha già visto ciò che c'era da vedere.",
            "options": [
                {
                    "text": "> Torna a considerare la stanza",
                    "target": "act1_retiring"
                }
            ]
        },
        "act1_library_old_books_revisited": {
            "location": "BIBLIOTECA — SCAFFALI ALTI",
            "text": "Il volume di J.A. resta indecifrabile quanto prima — non è stanotte che Arthur ne verrà a capo.",
            "options": [
                {
                    "text": "> Torna a considerare la stanza",
                    "target": "act1_retiring"
                }
            ]
        },
        "act2_edmund_aside2_revisited": {
            "location": "SALA DA PRANZO — MATTINO",
            "text": "Edmund le ha già dette, le parole che contavano. Non serve ripeterle.",
            "options": [
                {
                    "text": "> Prosegui",
                    "target": "act2_breakfast_edmund"
                }
            ]
        },
        "act2_breakfast_newspaper_revisited": {
            "location": "SALA DA PRANZO — MATTINO",
            "text": "Il giornale è ripiegato esattamente come prima. Arthur lo ha già letto per intero.",
            "options": [
                {
                    "text": "> Prosegui",
                    "target": "act2_breakfast_edmund"
                }
            ]
        },
        "act2_statue_daylight_revisited": {
            "location": "GIARDINO DI BLACKTHORN HALL — MATTINO",
            "text": "La statua resta quella di prima, il volto scalpellato, la 'J' sul basamento. Non c'è altro da notare alla luce del giorno.",
            "options": [
                {
                    "text": "> Prosegui",
                    "target": "act2_grounds_daylight"
                }
            ]
        },
        "act2_greenhouse_revisited": {
            "location": "SERRA ABBANDONATA",
            "text": "La serra resta silenziosa come prima, le piante secche di J.A. immobili nei loro vasi.",
            "options": [
                {
                    "text": "> Prosegui",
                    "target": "act2_grounds_daylight"
                }
            ]
        },
        "act2_crypt_graves_revisited": {
            "location": "CIMITERO DI FAMIGLIA",
            "text": "Le due tombe senza nome restano lì, curate e silenziose. Arthur ha già visto ciò che dovevano mostrargli.",
            "options": [
                {
                    "text": "> Prosegui",
                    "target": "act2_crypt_entrance"
                }
            ]
        },
        "act2_crypt_inscription_revisited": {
            "location": "CIMITERO DI FAMIGLIA — PORTA DELLA CAPPELLA",
            "text": "L'iscrizione sulla porta resta quella di prima. Non c'è altro da scoprirci, per ora.",
            "options": [
                {
                    "text": "> Torna a considerare il cimitero",
                    "target": "act2_crypt_entrance"
                }
            ]
        },
        "act1_study_details_revisited": {
            "location": "STUDIO DEL DOTTOR WREN",
            "text": "Lo studio è come lo ha lasciato: ordinato, silenzioso, in attesa del suo ritorno. Non c'è altro da vedere qui, non stasera.",
            "options": [
                {
                    "text": "> Prosegui",
                    "target": "act1_messenger_query",
                    "condition": {
                        "type": "flag",
                        "flag": "askedMessenger",
                        "equals": false
                    }
                },
                {
                    "text": "> Prosegui",
                    "target": "act1_messenger_query_revisited",
                    "condition": {
                        "type": "flag",
                        "flag": "askedMessenger"
                    }
                }
            ]
        },
        "act1_dinner_empty_seat_revisited": {
            "location": "SALA DA PRANZO",
            "text": "Il posto di Constance resta lì, apparecchiato e vuoto, esattamente come prima.",
            "options": [
                {
                    "text": "> Prosegui",
                    "target": "act1_dinner"
                }
            ]
        },
        "act1_dinner_staff_unease_revisited": {
            "location": "SALA DA PRANZO",
            "text": "Il valletto continua il suo servizio, teso come prima. Non c'è altro da notare, per ora.",
            "options": [
                {
                    "text": "> Prosegui",
                    "target": "act1_dinner"
                }
            ]
        },
        "act1_window_silhouette_revisited": {
            "location": "STANZA DEGLI OSPITI — FINESTRA",
            "text": "Il giardino, sotto la finestra, è tornato immobile e silenzioso. Della sagoma di prima, nessuna traccia.",
            "options": [
                {
                    "text": "> Prosegui",
                    "target": "act1_retiring"
                }
            ]
        },
        "act3_lab_symbols_revisited": {
            "location": "LABORATORIO DI LORD JOSIAH",
            "text": "Il cerchio resta esattamente come prima, i simboli inalterati, la macchia scura sempre lì.",
            "options": [
                {
                    "text": "> Prosegui",
                    "target": "act3_lab_examine"
                }
            ]
        },
        "act3_lab_apparatus_revisited": {
            "location": "LABORATORIO DI LORD JOSIAH",
            "text": "Gli strumenti sul tavolo restano dove erano. Arthur li ha già osservati a sufficienza.",
            "options": [
                {
                    "text": "> Prosegui",
                    "target": "act3_lab_examine"
                }
            ]
        }
    }
};

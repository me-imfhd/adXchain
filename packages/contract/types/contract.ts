/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/contract.json`.
 */
export type Contract = {
  "address": "ADXZ7eEnK2iU8tAPPvUbAw7NBQokSVhirAiHUFBHLfsj",
  "metadata": {
    "name": "contract",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initializeAdNft",
      "discriminator": [
        156,
        136,
        175,
        5,
        41,
        11,
        233,
        180
      ],
      "accounts": [
        {
          "name": "inventory",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  118,
                  101,
                  110,
                  116,
                  111,
                  114,
                  121
                ]
              },
              {
                "kind": "arg",
                "path": "inventoryId"
              }
            ]
          }
        },
        {
          "name": "adNft",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  102,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "inventory"
              },
              {
                "kind": "arg",
                "path": "nftId"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "inventory"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "inventoryId",
          "type": "u64"
        },
        {
          "name": "nftId",
          "type": "u64"
        },
        {
          "name": "nftMint",
          "type": "pubkey"
        },
        {
          "name": "priceLamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeInventory",
      "discriminator": [
        75,
        221,
        38,
        238,
        9,
        187,
        237,
        157
      ],
      "accounts": [
        {
          "name": "inventory",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  118,
                  101,
                  110,
                  116,
                  111,
                  114,
                  121
                ]
              },
              {
                "kind": "arg",
                "path": "inventoryId"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "inventoryId",
          "type": "u64"
        },
        {
          "name": "collectionMint",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "lendAdNft",
      "discriminator": [
        174,
        232,
        208,
        79,
        85,
        13,
        182,
        60
      ],
      "accounts": [
        {
          "name": "inventory",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  118,
                  101,
                  110,
                  116,
                  111,
                  114,
                  121
                ]
              },
              {
                "kind": "arg",
                "path": "inventoryId"
              }
            ]
          }
        },
        {
          "name": "adNft",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  102,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "inventory"
              },
              {
                "kind": "arg",
                "path": "nftId"
              }
            ]
          }
        },
        {
          "name": "signer",
          "signer": true
        },
        {
          "name": "lender"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "inventoryId",
          "type": "u64"
        },
        {
          "name": "nftId",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateAdNft",
      "discriminator": [
        155,
        16,
        60,
        209,
        125,
        159,
        140,
        90
      ],
      "accounts": [
        {
          "name": "inventory",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  110,
                  118,
                  101,
                  110,
                  116,
                  111,
                  114,
                  121
                ]
              },
              {
                "kind": "arg",
                "path": "inventoryId"
              }
            ]
          }
        },
        {
          "name": "adNft",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  102,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "inventory"
              },
              {
                "kind": "arg",
                "path": "nftId"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "inventory"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "inventoryId",
          "type": "u64"
        },
        {
          "name": "nftId",
          "type": "u64"
        },
        {
          "name": "nftMint",
          "type": "pubkey"
        },
        {
          "name": "priceLamports",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "adNftAccount",
      "discriminator": [
        232,
        201,
        2,
        122,
        175,
        197,
        162,
        55
      ]
    },
    {
      "name": "inventoryAccount",
      "discriminator": [
        107,
        115,
        86,
        10,
        0,
        234,
        7,
        43
      ]
    }
  ],
  "types": [
    {
      "name": "adNftAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "collectionMint",
            "type": "pubkey"
          },
          {
            "name": "currentRenter",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "nftMint",
            "type": "pubkey"
          },
          {
            "name": "priceLamports",
            "type": "u64"
          },
          {
            "name": "lent",
            "type": "bool"
          },
          {
            "name": "id",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "inventoryAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "collectionMint",
            "type": "pubkey"
          },
          {
            "name": "id",
            "type": "u64"
          }
        ]
      }
    }
  ]
};

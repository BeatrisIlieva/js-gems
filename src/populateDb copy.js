{
  $addFields: {
    stoneInfo: {
      $map: {
        input: [
          {
            stoneType: "$stonetypes",
            stoneColor: "$stonecolors",
            caratWeight: "$jewelrystones.caratWeight",
          }
        ],
        as: "js",
        in: {
          stoneType: "$$js.stoneType.title",
          stoneColor: "$$js.stoneColor.title",
          caratWeight: "$$js.caratWeight",
        }
        },
      },
    },
  },


{
  $addFields: {
    metalInfo: {
      $map: {
        input: [
          {
            metal: "$metals",
            caratWeight:
              "$jewelrymetals.caratWeight",
          },
        ],
        as: "jm",
        in: {
          metal: "$$jm.metal.title",
          caratWeight: "$$jm.caratWeight",
        },
      },
    },
  },
},
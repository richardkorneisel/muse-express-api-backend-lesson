"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      "use strict";
      const { Model } = require("sequelize");
      module.exports = (sequelize, DataTypes) => {
        class Song extends Model {
          /**
           * Helper method for defining associations.
           * This method is not a part of Sequelize lifecycle.
           * The `models/index` file will call this method automatically.
           */
          static associate(models) {
            Song.belongsTo(models.Artist, { foreignKey: "artistId" });
          }
        }
        Song.init(
          {
            name: DataTypes.STRING,
          },
          {
            sequelize,
            modelName: "Song",
          }
        );
        return Song;
      };
    }
  }
  Song.init(
    {
      title: DataTypes.STRING,
      artistId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Song",
    }
  );
  return Song;
};

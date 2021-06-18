'use strict';

import { DataTypes } from "sequelize";

export const TABLE_NAME = "YoutubeVideoData";

export const db = database => {

    database.define(TABLE_NAME, {
	id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
	},

	title:{
	    type: DataTypes.TEXT,
	    allowNull: false
	},

	description:{
	    type: DataTypes.TEXT,
	    allowNull: false
	},

	channelTitle:{
	    type: DataTypes.STRING,
	    allowNull: false
	},

	publishedAt:{
	    type: DataTypes.DATE,
	    allowNull: false
	},

	publishedTime:{
	    type: DataTypes.DATE,
	    allowNull: false
	},

	thunbnailUrl:{
	    type: DataTypes.STRING,
	    allowNull: false
	},

	createdAt: {
            allowNull: false,
            type: DataTypes.DATE
	},
	updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
	}
	
    });
};


export const associate = database => {
};

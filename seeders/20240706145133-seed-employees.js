"use strict";
const connectDb = require("../models/index");
const { Employee } = connectDb;
const { QueryTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Start a transaction
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const employees = [];
      let ctoList = [];
      let seniorSoftwareEngineers = [];
      let softwareEngineers = [];

      // Create 50 CTOs
      for (let i = 1; i <= 1000; i++) {
        const cto = {
          name: `CTO ${i}`,
          positionId: 1,
          positionName: "CTO",
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        ctoList.push(cto);
      }

      // Insert CTOs into database
      await queryInterface.bulkInsert("Employees", ctoList, { transaction });

      // Retrieve IDs of all CTOs
      const result = await queryInterface.sequelize.query(
        "SELECT id FROM employees WHERE positionName = 'CTO'",
        { type: QueryTypes.SELECT, transaction }
      );

      // Create 50 Senior Software Engineers
      for (let i = 1; i <= 1000; i++) {
        let parentId = Math.floor(Math.random() * 5) + 1;
        const seniorSoftwareEngineer = {
          name: `Senior Software Engineer ${i}`,
          positionId: 2,
          positionName: "Senior Software Engineer",
          parentId: parentId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        seniorSoftwareEngineers.push(seniorSoftwareEngineer);
      }

      // Insert Senior Software Engineers into database
      await queryInterface.bulkInsert("Employees", seniorSoftwareEngineers, {
        transaction,
      });

      // Retrieve IDs of all Senior Software Engineers
      const seniorList = await queryInterface.sequelize.query(
        "SELECT id FROM employees WHERE positionName = 'Senior Software Engineer'",
        { type: QueryTypes.SELECT, transaction }
      );

      // Create 50 Software Engineers
      for (let i = 1; i <= 1000; i++) {
        let parentId =
          seniorList[Math.floor(Math.random() * seniorList.length)].id;
        const softwareEngineer = {
          name: `Software Engineer ${i}`,
          positionId: 3,
          positionName: "Software Engineer",
          parentId: parentId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        softwareEngineers.push(softwareEngineer);
      }

      // Insert Software Engineers into database
      await queryInterface.bulkInsert("Employees", softwareEngineers, {
        transaction,
      });

      // Retrieve IDs of all Software Engineers
      const softwareEngineerList = await queryInterface.sequelize.query(
        "SELECT id FROM employees WHERE positionName = 'Software Engineer'",
        { type: QueryTypes.SELECT, transaction }
      );

      // Create 50 Junior Software Engineers
      const juniorSoftwareEngineers = [];
      for (let i = 1; i <= 1000; i++) {
        let parentId =
          softwareEngineerList[
            Math.floor(Math.random() * softwareEngineerList.length)
          ].id;
        const juniorSoftwareEngineer = {
          name: `Junior Software Engineer ${i}`,
          positionId: 4,
          positionName: "Junior Software Engineer",
          parentId: parentId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        juniorSoftwareEngineers.push(juniorSoftwareEngineer);
      }

      // Insert Junior Software Engineers into database
      await queryInterface.bulkInsert("Employees", juniorSoftwareEngineers, {
        transaction,
      });

      // Commit the transaction
      await transaction.commit();
    } catch (error) {
      // Rollback the transaction if there's an error
      await transaction.rollback();
      throw error; // Re-throw the error to handle it further up the chain
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Start a transaction
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Delete all seeded employees
      await queryInterface.bulkDelete("Employees", null, { transaction });

      // Commit the transaction
      await transaction.commit();
    } catch (error) {
      // Rollback the transaction if there's an error
      await transaction.rollback();
      throw error; // Re-throw the error to handle it further up the chain
    }
  },
};

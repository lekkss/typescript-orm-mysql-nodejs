import { Request, Response } from "express";
import Tutorial from "../models/tutorial.model";
import tutorialRepository from "../repositories/tutorial.repository";

export default class TutorialController {
  async create(req: Request, res: Response) {
    try {
      // Extract tutorial data from the request body
      const newTutorial: Tutorial = req.body;
      // Save the new tutorial asynchronously
      const savedTutorial = await tutorialRepository.save(newTutorial);

      // Respond with a success message and the saved tutorial
      res.status(201).json({
        message: "Tutorial created successfully",
        tutorial: savedTutorial,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      // Extract search parameters from the request query
      const { title, published } = req.query;

      // Call retrieveAll method from the tutorialRepository
      const tutorials = await tutorialRepository.retrieveAll({
        title: typeof title === "string" ? title : undefined,
        published: published ? published === "true" : undefined,
      });

      // Respond with the retrieved tutorials
      res.status(200).json(tutorials);
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const tutorialId: number = parseInt(req.params.id, 10); // Assuming the tutorial ID is passed as a route parameter

      // Call the retrieveById function to fetch the tutorial
      const tutorial: Tutorial | null = await tutorialRepository.retrieveById(
        tutorialId
      );

      if (tutorial) {
        // If the tutorial is found, send it in the response
        res.status(200).json(tutorial);
      } else {
        // If the tutorial is not found, send a 404 Not Found response
        res.status(404).json({ error: "Tutorial not found" });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      // Extract tutorial data from the request body
      const tutorialData: Tutorial = req.body;

      // Call the update function to update the tutorial
      const affectedRows: number = await tutorialRepository.update(
        tutorialData
      );

      // Check if any rows were affected by the update
      if (affectedRows > 0) {
        // If the update was successful, send a success response
        res.status(200).json({ message: "Tutorial updated successfully" });
      } else {
        // If no rows were affected, send a 404 Not Found response
        res
          .status(404)
          .json({ error: "Tutorial not found or no changes were made" });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      // Extract tutorial ID from the request parameters
      const tutorialId: number = parseInt(req.params.id, 10);

      // Call the delete function to delete the tutorial
      const affectedRows: number = await tutorialRepository.delete(tutorialId);

      // Check if any rows were affected by the delete operation
      if (affectedRows > 0) {
        // If the delete was successful, send a success response
        res.status(200).json({ message: "Tutorial deleted successfully" });
      } else {
        // If no rows were affected, send a 404 Not Found response
        res.status(404).json({ error: "Tutorial not found" });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      // Call the deleteAll function to delete all tutorials
      const affectedRows: number = await tutorialRepository.deleteAll();

      // Send a success response
      res
        .status(200)
        .json({ message: `Deleted ${affectedRows} tutorials successfully` });
    } catch (err) {
      res.status(500).json({
        message: "Failed to delete tutorials",
      });
    }
  }
}

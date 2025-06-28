import type { Request, Response } from "express";

import prisma from "../prisma";

export const getAllProjectTags = async (_: Request, res: Response) => {
  try {
    const data = await prisma.projectTag.findMany({
      orderBy: { createdAt: "desc" },
    });
    const totalCount = await prisma.projectTag.count();

    res.json({ data, _paging: { totalCount, totalPages: 1 } });
  } catch (error) {
    res.status(500).json({
      message: "An internal error has occurred",
      error: error.message,
    });
  }
};

export const getProjectTagById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const data = await prisma.projectTag.findUnique({ where: { id } });
    if (data == null) {
      res.status(404).json({ message: "Project tag not found" });
      return;
    }

    res.json({ data });
  } catch (error) {
    res.status(500).json({
      message: "An internal error has occurred",
      error: error.message,
    });
  }
};

export const createProjectTag = async (req: Request, res: Response) => {
  const { name, color } = req.body;

  try {
    const data = await prisma.projectTag.create({ data: { name, color } });

    res
      .status(201)
      .json({ message: "Project tag has been successfully created", data });
  } catch (error) {
    res.status(500).json({
      message: "An internal error has occurred",
      error: error.message,
    });
  }
};

export const updateProjectTag = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, color } = req.body;

  try {
    let data = await prisma.projectTag.findUnique({ where: { id } });
    if (data == null) {
      res.status(404).json({ message: "Project tag not found" });
      return;
    }

    data = await prisma.projectTag.update({
      where: { id },
      data: { name, color },
    });

    res.json({ message: "Project tag has been successfully updated", data });
  } catch (error) {
    res.status(500).json({
      message: "An internal error has occurred",
      error: error.message,
    });
  }
};

export const deleteProjectTag = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    let data = await prisma.projectTag.findUnique({ where: { id } });
    if (data == null) {
      res.status(404).json({ message: "Project tag not found" });
      return;
    }

    data = await prisma.projectTag.delete({ where: { id } });

    res.json({ message: "Project tag has been successfully deleted", data });
  } catch (error) {
    res.status(500).json({
      message: "An internal error has occurred",
      error: error.message,
    });
  }
};

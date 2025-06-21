import type { Request, Response } from "express";

import prisma from "../prisma";

export const getAllProjects = async (req: Request, res: Response) => {
  const pageNo = parseInt(req.query.pageNo as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const includeTrashed = Boolean(req.query.includeTrashed) || false;

  const condition = includeTrashed ? {} : { deletedAt: null };

  try {
    const data = await prisma.project.findMany({
      skip: pageSize * (pageNo - 1),
      take: pageSize,
      where: condition,
      orderBy: { createdAt: "desc" }, // Personal preference
    });

    const totalCount = await prisma.project.count({ where: condition });
    const totalPages = Math.ceil(totalCount / pageSize);

    res.json({ data, _paging: { totalCount, totalPages } });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An internal error has ocurred", error: error.message });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const data = await prisma.project.findUnique({ where: { id } });
    if (data == null) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.json({ data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An internal error has ocurred", error: error.message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const { name, description, startedAt } = req.body;

  try {
    const data = await prisma.project.create({
      data: { name, description, startedAt },
    });

    res
      .status(201)
      .json({ message: "Project has been successfully created", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An internal error has ocurred", error: error.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, description, startedAt } = req.body;

  try {
    let data = await prisma.project.findUnique({ where: { id } });
    if (data == null) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    data = await prisma.project.update({
      where: { id },
      data: { name, description, startedAt },
    });

    res.json({ message: "Project has been successfully updated", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An internal error has ocurred", error: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const destroy = Boolean(req.query.destroy) || false;

  try {
    const data = await prisma.project.findUnique({ where: { id } });
    if (data == null) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    if (!destroy) {
      await prisma.project.update({
        data: { deletedAt: new Date() },
        where: { id },
      });
    } else {
      await prisma.project.delete({ where: { id } });
    }

    res.json({
      message: destroy
        ? "Project has been permanently deleted"
        : "Project has been archived",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An internal error has ocurred", error: error.message });
  }
};

export const restoreProject = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    let data = await prisma.project.findUnique({ where: { id } });
    if (data == null) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    if (data.deletedAt == null) {
      res.status(400).json({ message: "This project is already active" });
      return;
    }

    data = await prisma.project.update({
      data: { deletedAt: null },
      where: { id },
    });

    res.json({
      message: "Project has been successfully restored",
      data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An internal error has ocurred", error: error.message });
  }
};

export const updateTags = async (req: Request, res: Response) => {
  // TODO: Implement logic
};

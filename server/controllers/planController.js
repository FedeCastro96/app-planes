import Plan from "../models/Plan.js";

//crear un plan
export const createPlan = async (req, res) => {
  const { title, description, link, images, tags, rating, status } = req.body;
  try {
    const newPlan = new Plan({
      title,
      description,
      link,
      images,
      tags,
      rating,
      status,
    });
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al crear el plan",
      error: error.message,
      details: error.errors
        ? Object.values(error.errors).map((err) => err.message)
        : null,
    });
  }
};

//obtener todos los planes
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: "error al obtener los planes" });
    console.log(error);
  }
};

//obtener un plan por id
export const getPlanById = async (req, res) => {
  const { id } = req.params;
  try {
    const plan = await Plan.findById(id);
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: "error al obtener el plan" });
    console.log(error);
  }
};

//actualizar un plan
export const updatePlan = async (req, res) => {
  const { id } = req.params;
  const { title, description, link, images, tags, rating, status } = req.body;
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(
      id,
      {
        title,
        description,
        link,
        images,
        tags,
        rating,
        status,
      },
      { new: true }
    );
    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: "error al actualizar el plan" });
    console.log(error);
  }
};

//eliminar un plan
export const deletePlan = async (req, res) => {
  const { id } = req.params;
  try {
    await Plan.findByIdAndDelete(id);
    res.status(200).json({ message: "plan eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "error al eliminar el plan" });
    console.log(error);
  }
};

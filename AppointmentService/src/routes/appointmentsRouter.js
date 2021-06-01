import { Router } from "express";

import Appointment from "../schemas/Appointment";
import CreateAppointmentService from "../services/CreateAppointmentService";
import DeleteAppointmentService from "../services/DeleteAppointmentService";

const appointmentsRouter = Router();
const CreateAppointment = new CreateAppointmentService();

appointmentsRouter.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find({});

    if (!appointments) return res.json({ message: "Empty database." });

    return res.json(appointments);
  } catch (err) {
    return res.status(err.statusCode).json({ error: err.message });
  }
});

appointmentsRouter.post("/", async (req, res) => {
  try {
    const { patient_id, doctor_id, appointmentDate } = req.body;

    const appointment = CreateAppointment.execute(
      patient_id,
      doctor_id,
      appointmentDate
    );

    return res.json(appointment);
  } catch (err) {
    return res.status(err.statusCode).json({ error: err.message });
  }
});

appointmentsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const DeleteAppointment = new DeleteAppointmentService();
    await DeleteAppointment.execute(id);

    return res.json({ message: "Consulta deletada com sucesso" });
  } catch (err) {
    return res.status(err.statusCode).json({ error: err.message });
  }
});

export default appointmentsRouter;

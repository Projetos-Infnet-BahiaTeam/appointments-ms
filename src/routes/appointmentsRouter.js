import { Router } from "express";

import Appointment from "../schemas/Appointment";
import CreateAppointmentService from "../services/CreateAppointmentService";
import DeleteAppointmentService from "../services/DeleteAppointmentService";
import UpdateAppointmentService from "../services/UpdateAppointmentService";

import axios from "axios";

const appointmentsRouter = Router();

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
    const CreateAppointment = new CreateAppointmentService();

    const patient = await axios.get(
      `http://localhost:3002/patients/${patient_id}`
    );
    console.log(patient);
    if (!patient) return res.json("Patient do not exists!");

    const doctor = await axios.get(
      `http://localhost:8080/doctors/${doctor_id}`
    );
    if (!doctor) return res.json("Doctor do not exists!");

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

appointmentsRouter.put("/", async (req, res) => {
  try {
    const { id, newAppointmentDate } = req.body;

    const UpdateAppointment = new UpdateAppointmentService();
    await UpdateAppointment.execute(id, newAppointmentDate);

    return res.json({ message: "Consulta modificada com sucesso" });
  } catch (err) {
    return res.status(err.statusCode).json({ error: err.message });
  }
});

export default appointmentsRouter;

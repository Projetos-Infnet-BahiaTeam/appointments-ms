require('dotenv').config();
import { Router } from "express";
import axios from "axios";

import Appointment from "../schemas/Appointment";
import CreateAppointmentService from "../services/CreateAppointmentService";
import DeleteAppointmentService from "../services/DeleteAppointmentService";
import UpdateAppointmentService from "../services/UpdateAppointmentService";

const appointmentsRouter = Router();

const doctorsMsPort = process.env.DOCTORS_MS_PORT;
const patientsMsPort = process.env.PATIENTS_MS_PORT;

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
      `http://localhost:${patientsMsPort}/api/patients/${patient_id}`
    );
    if (!patient) return res.json("Patient do not exists!");

    const doctor = await axios.get(
      `http://localhost:${doctorsMsPort}/api/doctors/${doctor_id}`
    );
    if (!doctor) return res.json("Doctor do not exists!");

    const appointment = await CreateAppointment.execute(
      patient_id,
      patient.data.nome,
      doctor_id,
      doctor.data.doctor.doctor,
      appointmentDate
    );

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({error: err.message});
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

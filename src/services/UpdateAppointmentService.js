import Appointment from "../schemas/Appointment";
import AppError from "../errors/AppError";

class UpdateAppointmentService {
  async execute(id, newAppointmentDate) {
    const appointment = await Appointment.findById(id);

    if (!appointment) throw new AppError("Consulta não existe", 400);

    await Appointment.updateOne(appointment, {
      appointmentDate: newAppointmentDate,
    });

    return true;
  }
}

export default UpdateAppointmentService;

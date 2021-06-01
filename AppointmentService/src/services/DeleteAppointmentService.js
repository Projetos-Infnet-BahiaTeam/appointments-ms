import Appointment from "../schemas/Appointment";
import AppError from "../errors/AppError";

class DeleteAppointmentService {
  async execute(id) {
    const appointment = await Appointment.findById(id);

    if (!appointment) throw new AppError("Consulta não existe", 400);

    await Appointment.deleteOne(appointment);

    return true;
  }
}

export default DeleteAppointmentService;

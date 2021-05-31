import Appointment from '../schemas/Appointment';

//[] CHECK IF THERES ANOTHER APPOINTMENT IN THE SAME DATE/TIME
class CreateAppointmentService {
  async execute(patient_id, doctor_id, appointmentDate) {
    const appointment = await Appointment.create({
      patient_id,
      doctor_id,
      appointmentDate
    })

    return appointment;
  }
}

export default CreateAppointmentService;
import Appointment from '../schemas/Appointment';

//[] CHECK IF THERES ANOTHER APPOINTMENT IN THE SAME DATE/TIME
class CreateAppointmentService {
  async execute(patient_id, patientsName, doctor_id, doctorsName, appointmentDate) {
    const appointment = await Appointment.create({
      patient_id,
      patientsName,
      doctor_id,
      doctorsName,
      appointmentDate
    })
    return appointment;
  }
}

export default CreateAppointmentService;
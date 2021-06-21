import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  patient_id: {
    type: String,
    required: true,
  },
  patientsName: {
    type: String,
    required: true,
  },
  doctor_id: {
    type: String,
    required: true
  },
  doctorsName: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  }
},
{
  versionKey: false
});

export default mongoose.model('Appointment', AppointmentSchema);


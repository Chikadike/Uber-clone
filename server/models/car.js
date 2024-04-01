// Car schema
const carSchema = new mongoose.Schema({
    model: String,
    price: Number,
    availability: Boolean,
  });
  
  const Car = mongoose.model('Car', carSchema);

  module.exports = Car;
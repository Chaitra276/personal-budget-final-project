const mongoose = require('mongoose');

mongoose.connect('"mongodb+srv://chaitra276:chaitra276@cluster0.lyqzk.mongodb.net/PersonalBudget?retryWrites=true&w=majority";',{
    useNewUrlParser:true,
    useCreateIndex : true
});
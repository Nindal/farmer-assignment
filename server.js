const db = require("./app/models");
const app = require('./app');
const port = process.env.PORT || 3000;
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
}).catch(err =>{
  console.log(err);
})
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

app.get('/',(req,res)=>{
  res.json({
    message : "welcome to our farmers app"
  })
})
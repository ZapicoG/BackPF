const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const { User } = require('../db.js');
const authToken = require("./middleware/authenticateToken");

//AUTH
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post( "/signup", async (req, res) => {
    const { userName, password } = req.body;
    const user = await User.findOne({
      where: {
        userName: userName
      }
    })

    console.log(user);
    if (user) {
      // 422 Unprocessable Entity: server understands the content type of the request entity
      // 200 Ok: Gmail, Facebook, Amazon, Twitter are returning 200 for user already exists
      return res.status(200).json({
        errors: [
          {
            email: user.email,
            msg: "The user already exists",
          },
        ],
      });
    }

    // Hash password before saving to database
    const salt = await bcrypt.genSalt(10);
    console.log("salt:", salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashed password:", hashedPassword);

    // Save email and password to database/array
   /*  users.push({
      email,
      password: hashedPassword,
    }); */

    await User.create({
      email,
      password: hashedPassword
    })

    // Do not include sensitive information in JWT
    const accessToken = await JWT.sign(
      { email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "600s",
      }
    );

    res.json({
      accessToken,
    });
  });
  



//////////////AUTH

/////////////LOGIN

// Log in
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Look for user email in the database
 /*  let user = users.find((user) => {
    return user.email === email;
  }); */

  const user = await User.findOne({
    where: {
      email: email
    }
  })

 

  // If user not found, send error message
  if (!user) {
    return res.status(400).json({
      errors: [
        {
          msg: "Invalid credentials",
        },
      ],
    });
  }

  // Compare hased password with user password to see if they are valid
  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      errors: [
        {
          msg: "Email or password is invalid",
        },
      ],
    });
  }

  // Send JWT
  const accessToken = await JWT.sign(
    { email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "600s",
    }
  );

  res.json({
    accessToken,
  });
});

/////////////LOGIN


/////////////GET

router.get('/dogs/:idRaza', async (req,res)=>{
  const infoTota = await getAllDogs();

  const infoIdRaza = await infoTota.filter(e=> e.id.toString() === req.params.idRaza);
  if(infoIdRaza.length>0) return res.json(infoIdRaza);
  return res.status(404).send('No hay una raza asociada a ese ID');
})




  router.get('/dogs',async (req,res)=>{
  const name = req.query.name;
  const dogs = await getAllDogs();
  if(name){
    const resultado = await dogs.filter(e=>e.name.toLowerCase().includes(name.toLowerCase()));
    if(resultado.length===0){
      return res.send('No se ha encontrado información para esa raza.');
    }
    return res.send(resultado);
  }
return res.send(dogs)
}) 



router.get('/temperaments', async (req,res)=>{
  const todo = await getAllDogs();
  const temperamentos = todo.map(e=>{
    return e.temperament
  })
  const unicos = await removeDuplicates(temperamentos.flat(),'nada');
  const objectUnicos = unicos.map(e=>{
    return {
      name: e
    }
  })
 /*  Temperament.bulkCreate(objectUnicos);
  res.send('ok'); */
  objectUnicos.forEach(e=>{
    Temperament.findOrCreate({
      where: {name: e.name}
    })
  })
  const allTemperaments = await Temperament.findAll();
  res.send(allTemperaments);
})

router.get('/downloadedTemperaments', async (req,res)=>{
  const temperamentsInDb = await Temperament.findAll();
  res.send(temperamentsInDb);
})





///////////////POST
router.post('/dogs', async (req,res)=>{
  const {name, height,weight,life_span,temperament,image} = req.body;
  //AGREGAR VALIDACION POR TIPO DE DATOS
  if(!name || !height || !weight){
    return res.send('datos insuficientes para la creacion de la raza');
  }

  try{
  
  const newDog = await Dog.create({
    name,
    height,
    weight,
    image,
    life_span: life_span?life_span:"No info about Life_span"
  })


  const idTemp = await Temperament.findAll({
    where: {
      name:temperament
    }
  })

  
  newDog.addTemperament(idTemp);
  return res.send(newDog);
}catch(error){
  res.send('ha ocurrido algun problema');
}
})



///DELETE
 router.get('/dogDelete/:id',authToken, async(req,res)=>{
  console.log('funciona');
  const row = await Dog.findOne({
    where: {id: req.params.id}
  })
  if(row){
    await row.destroy();
    return res.send('Deleted');
  }
  return res.send('nothing to delete')
}) 


/* rutas protegidas con el middleware
router.get("/private", authToken, (req, res) => {
  res.json(privatePosts);
});
*/


module.exports = router;

  /* URLs importantes */
  /* const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds', { */
  /* const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds/search?q=Azawakh', { */


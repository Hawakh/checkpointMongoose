const Person=require('../models/Person')
const express=require('express')

// show the list of person existe déja
const index = (req, res, next) => {
    Person.find()
        .then(response => {
            res.json({ person: response })
        })
        .catch((err) => {
            res.json({
                message: "An error occurred!"
            })
        })
}

//Create and Save a Record of a Model:
const store = (req, res, next) => {
    let person = new Person({
        name: req.body.name,
        age: req.body.age,
        favoriteFoods:req.body.favoriteFoods
    })
    person.save()
        .then(() => {
            res.json({
                message: "Person added successfully"
            })
        })
        .catch((err) => {
            res.json({
                message: "An error occurred!"
            })
        })
}
//Create Many Records with model.create()
const storemany = (req, res, next) => {
    const arrayOfPeople = req.body.arrayOfPeople;
  
    Person.create(arrayOfPeople)
      .then((people) => {
        console.log('People saved to database:', people);
        res.json({ message: 'People saved to database', data: people });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Error saving people to database' });
      });
  };

  //Use model.find() to Search Your Database
  const show = (req, res, next) => {
    let personName = req.body.personName;
  
    Person.find({ name: personName }) 
      .then((response) => {
        res.json({ person: response });
      })
      .catch((err) => {
        res.json({
          message: "An error occurred!",
        });
      });
  };
//Use model.findOne() to Return a Single Matching Document from Your Database
const showfavouritefood=(req,res,next)=>{
    const personFavouriteFood = req.body.personFavouriteFood;
Person.findOne({favoriteFoods: personFavouriteFood})
.then((response) => {
    res.json({ person: response });
  })
  .catch((err) => {
    res.json({
      message: "An error occurred!",
    });
  });
}
//Use model.findById() to Search Your Database By _id
const showperson = (req, res, next) => {
    let personID = req.body.personID
    Person.findById(personID)
        .then(response => {
            res.json({ person: response })
        })
        .catch((err) => {
            res.json({
                message: "An error occurred!"
            })
        })
}

//Perform Classic Updates by Running Find, Edit, then Save(wslt lahné)
const rfes = (req, res, next) => {
    let personID = req.body.personID;
    Person.findById(personID)
      .then(person => {
        person.favoriteFoods.push('hamburger');
        return person.save();
      })
      .then(updatedPerson => {
        res.json(updatedPerson);
      })
      .catch(err => {
        res.json({
          message: "An error occurred!"
        });
      });
  };

//Perform New Updates on a Document Using model.findOneAndUpdate()
const update = (req, res, next) => {
  let personName = req.body.personName
 
  Person.findOne({ name: personName })
  .then(person => {
      if (!person) {
          throw new Error('Person not found')
      }

      return Person.findByIdAndUpdate(person._id, { age: 20 }, { new: true })
  })
  .then(response => {
      res.json({ person: response })
  })
  .catch((err) => {
      res.json({
          message: err.message || "An error occurred!"
      })
  })
}
//Delete One Document Using model.findByIdAndRemove
const destroy = (req, res, next) => {
  let personID = req.body.personID
  Person.findOneAndRemove({_id: personID})
      .then(() => {
          res.json({
              message: "person deleted successfully"
          })
      })
      .catch((err) => {
          res.json({
              message: "An error occurred!"
          })
      })
}
//MongoDB and Mongoose - Delete Many Documents with model.remove()
const deleteall = (req, res, next) => {
  Person.deleteMany({ name: "Mary" })
    .then((result) => {
      console.log(result);
      res.json({
        message: "All persons named Mary deleted successfully"
      })
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "An error occurred!"
      })
    })
}
  //Chain Search Query Helpers to Narrow Search Results
  const tri = (req, res, next) => {
    Person.find({ favoriteFoods: 'burritos' })
      .sort({ name: 1 })
      .limit(2)
      .select('-age')
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.json({
          message: 'An error occurred!'
        });
      });
  }

    module.exports = {
        index,
        storemany,
        store,
        show,
        showfavouritefood,
        showperson,
        rfes,
        update,
        destroy,
        deleteall,
        tri
    }
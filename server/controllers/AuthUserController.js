import mongoose, { now } from "mongoose";
import AuthModel from "../model/AuthModel.js";
import userModel from "../model/UserModel.js";
import bcrypt from 'bcrypt';
import multer from "multer";
import { json } from "express";
export const userSignUp = async (req, res) => {
  const { name, email, password, mobile, oid, dailyLocations } = req.body; // dailyLocations is allowed to be empty or not provided

  try {
    const checkEmail = await userModel.findOne({ email });

    if (checkEmail) {
      return res.json({ message: 'Email id already exists' });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hash,
      mobile,
      oid,
      dailyLocations: dailyLocations || [],
    });

    await newUser.save();

    const RootUser = await AuthModel.findById(oid);
    console.log(RootUser)
    if (RootUser) {
      console.log(RootUser,'if')
      RootUser.users.push(newUser._id); // Push the new user's _id to RootUser's users array
      await RootUser.save();
      return res.json({ message: 'User signup successful' });
    } else {
      console.log(RootUser,"else")
      return res.json({ message: 'RootUser not found' });
    }
  } catch (err) {
    console.error(`Error from user signup controller: ${err.message}`);
    return res.status(500).json({ message: 'An error occurred during user signup' });
  }
};
// export const PostCoordinates = async (req, res) => {
//   try {
//     const { startLocation, endLocation, date } = req.body;
//     const userId = req.params.id;
//     // Find the user by ID
//     if (!mongoose.isValidObjectId(userId)) {
//         return res.status(400).json({ error: 'Invalid user ID format' });
//       }
  
//       const user = await userModel.findById(userId);
  
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//     // Check if the user already has a location entry for the specified date
//     const existingLocation = user.dailyLocations.find((location) => location.date === date);
//     console.log(existingLocation,'this')
//     if (existingLocation) {
//       // If a location entry already exists for this date, update it
//       // existingLocation.startlocation = startLocation;
//       existingLocation.endlocation = endLocation;
//       res.json({message:'end location updated'})
//     } else {
//       // If not, create a new location entry for the date
//       user.dailyLocations.push({
//         date,
//         startlocation: startLocation,
//         endlocation: endLocation,
//       });
//     }
//     await user.save();
//     res.json({ message: 'Location data posted successfully' });
//   } catch (err) {
//     // console.error(err);
//     res.json({ error: `Error from PostCoordinates controller ${err}` });
//   }
// };

export const PostCoordinates = async (req, res) => {
  try {
    const { startLocation, endLocation, date } = req.body;
    const userId = req.params.id;

    // Find the user by ID
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new Date object from the 'date' string
    const parsedDate = new Date(date);

    // Extract day, month, and year from the parsed date
    const day = parsedDate.getDate();
    const month = parsedDate.getMonth() + 1;
    const year = parsedDate.getFullYear();

    // Check if the user already has a location entry for the specified date
    const existingLocation = user.dailyLocations.find(
      (location) =>
        location.date === `${day}-${month}-${year}` // Reformat the date for comparison
    );

    if (existingLocation) {
      // If a location entry already exists for this date, update it
      existingLocation.endlocation = endLocation;
      await user.save(); // Save the user document with the updated location
      return res.json({ message: 'End location updated' });
    } else {
      // If not, create a new location entry for the date
      user.dailyLocations.push({
        date: `${day}-${month}-${year}`, // Reformat the date for storage
        startlocation: startLocation,
        endlocation: endLocation,
      });
      await user.save(); // Save the user document with the new location entry
      return res.json({ message: 'Location data posted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Error from PostCoordinates controller ${err.message}` });
  }
};
// get cO_odinates 
export const getCoordinatesByDateAndUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const requestedDate = req.params.date; // Use 'params' to get the date parameter from the URL

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const coordinates = user.dailyLocations.find(
      (location) => location.date === requestedDate
    );

    if (coordinates) {
      return res.json({ data: coordinates });
    } else {
      return res.status(404).json({ error: 'Location data not found for the specified date' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Error from getCoordinatesByDateAndUser controller: ${err.message}` });
  }
};

// post form data for daily forms


const getCurrentDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  return `${day}-${month}-${year}`;
};
// import { validationResult } from 'express-validator';

export const postFormData = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      sonWifeDaughter,
      houseNumber,
      colony,
      villageDivision,
      occupation,
      totalNumberOfVoters,
      totalNumberOfLocalVoters,
      totalNumberOfNonLocalVoters,
      caste,
      category,
      religion,
      comments,
    } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new Date object for the current date
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const newData = {
      name,
      sonWifeDaughter,
      houseNumber,
      colony,
      villageDivision,
      occupation,
      totalNumberOfVoters,
      totalNumberOfLocalVoters,
      totalNumberOfNonLocalVoters,
      caste,
      category,
      religion,
      comments,
      date: `${day}-${month}-${year}`,
    };

    user.dailyForms.push(newData);
    await user.save();
    res.json({ message: 'Form data posted successfully' });
  } catch (err) {
    console.error(`Error from postFormData controller: ${err.message}`);
    res.status(500).json({ message: 'An error occurred while posting form data' });
  }
};


// get daily forms by date 
export const getDataByDate = async (req, res) => {
  try {
    const userId = req.params.id;
    const requestedDate = req.params.date; // Use 'params' to get the date parameter from the URL

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // const formData = user.dailyForms.find(
    //   (data) => data.date === requestedDate
    // );
    // console.log(formData)
    const formDataList = user.dailyForms.filter((data) => data.date === requestedDate);

    if (formDataList.length > 0) {
      // console.log(formDataList);
      res.json({ data: formDataList });
    } else {
      res.status(404).json({ error: 'Data not found for the specified date' });
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Error from getDataByDate controller: ${err.message}` });
  }
};
// creating the multer storage and sending to the file uploads

const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname);
  },
});

// Create a multer instance with the storage configuration
const upload = multer({ storage: Storage }).single("file")

// Controller for handling user report submission
export const postUserReport = async (req, res) => {
  try {
    // Ensure that 'test_Image' is the name of the file input form

    // Handle the file upload using multer
    upload(req, res, async (err) => {
      if (err){
        console.error('Error from upload: ', err);
        return res.status(500).json({ message: 'File upload error' });
      }
      const {id}=req.params
      // Extract data from the request body
      const { houseNumber, name, issue, comments,img } = req.body;

      // Find the user by ID
      const user = await userModel.findById(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      } else {
        // Create a new user report object
        const newUserReport = {
          houseNumber,
          name,
          issue,
          comments,
          img
          // img: {
          //   data:req.file.filename,
          //   contentType:'image/png'
          // },
        };
        // Push the new user report into the user's reports array
        user.reports.push(newUserReport);
        // Save the user with the updated reports array
        // }<>><>----++++>
        await user.save();
        res.status(201).json({ message: 'User report submitted successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getUserReports = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      if (!user.reports || user.reports.length === 0) {
        // Handle the case where there are no reports for the user
        return res.status(404).json({ message: 'No reports found for this user' });
      }
      // Check if imageData exists in the user's first report
      const firstReport = user.reports[0];
      if (!firstReport.img || !firstReport.img.data) {
        // Provide a placeholder image or a message when imageData is missing
        const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wAA/wAB/peXQAAAABJRU5ErkJggg==';
        return res.status(404).json({ message: 'Image data not found for this user', imageData: placeholderImage });
      }

      // Retrieve the user's reports and image data
      const { reports } = user;
      const base64Image = firstReport.img.data.toString('base64');

      res.status(200).json({ reports, imageData: base64Image });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



// post notifications 
export const notificationsController = async (req, res) => {
  const { notification } = req.body;
  const { id } = req.params;
  try {
    const admin = await AuthModel.findById(id);

    if (!admin) {
      return res.json({ error: 'Admin not found' });
    }

    // Assuming you want to store notifications as an array
    admin.notifications.push(notification);

    // Save the updated admin document with the new notification
    await admin.save();

    res.json({ message: 'Notification sent' });
  } catch (err) {
    res.json({ error: err.message });
  }
}
export const getNotifications = async (req, res) => {
  const  {id}  = req.params;
  console.log('hello')
  try {

    const user = await AuthModel.findById(id);
    console.log(user)
    if (user) {
      res.json({ data: user.notifications });
    } else {
      res.json({ error: "User not found" });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
};
// export const getCo_Ordinates=async(req,res)=>{
// }
// post status

export const postStatus = async (req, res) => {
  const { status } = req.body;
  const {id}=req.params
  console.log(id)
  try {
    const getUser = await userModel.findById(id);
    console.log(getUser)

    if (getUser) {
      // console.log(status)
      getUser.status = status; // Update the user's status field
      await getUser.save(); // Save the updated document back to the database

      res.json({ m: 'ok' });
    } else {
      res.json({ m: "user not found" });
    }
  } catch (err) {
    res.json({ m: err.message });
  }
}
export const logout = async (req, res) => {
  // const { status } = req.body;
  const { id } = req.params;

  try {
    const getUser = await userModel.findById(id);

    if (getUser) {
      // Set the user's status to 'offline' (or your desired value)
      getUser.status = 'offline'; // Update the user's status field

      // Save the updated document back to the database
      await getUser.save();

      res.json({ message: 'User logged out successfully' });
    } else {
      res.json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
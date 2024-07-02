import Data from "../model/data.js";

export const saveData = async (req, res) => {
  try {
    const { URL, customURL } = req.body;

    // Add https:// if not present
    if (!/^https?:\/\//i.test(URL)) {
      req.body.URL = `https://${URL}`;
    }

    if (req.body.customURL === "") {
      const data = await Data.findById("667f167e0d7d8cf1c0bf7f69");

      const newNum = data.Num + 1;

      await Data.findByIdAndUpdate("667f167e0d7d8cf1c0bf7f69", {
        $set: { Num: newNum },
      });

      const databody = {
        redirectFrom: newNum,
        redirectTo: req.body.URL,
        savedDate: new Date(),
      };

      const newData = new Data(databody);
      await newData.save();

      return res.status(200).json(newNum);
    } else {
      const data = await Data.findOne({ redirectFrom: req.body.customURL });

      if (data) {
        return res.status(409).json({ msg: "Custom URL already exists" });
      }

      const databody = {
        redirectFrom: req.body.customURL,
        redirectTo: req.body.URL,
        savedDate: new Date(),
      };

      const newData = new Data(databody);
      await newData.save();

      return res.status(200).json(req.body.customURL);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getData = async (req, res) => {
  try {
    const data = await Data.findOne({ redirectFrom: req.params.redirectFrom });

    if (!data) {
      return res.status(404).json({ msg: "No Redirect Found!" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ msg: "Error while Finding the data", error });
  }
};

export const checkServer = async (request, response) => {
  response.status(200).json({msg:"Server is running"});
}

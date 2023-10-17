const BaseController = require("./BaseController");

class InstructionsController extends BaseController {
  constructor(model) {
    super(model);
  }
}

// update photo
  async updatePhoto(req, res) {
    try {
      let itineraryToAdd = req.body;
      const { userId, itineraryId } = req.params;
      // Find the existing itinerary
      let itineraryToEdit = await this.model.findByPk(itineraryId);
      if (!itineraryToEdit) {
        return res
          .status(404)
          .json({ error: true, msg: "Itinerary not found" });
      }
      console.log("itineraryToEdit", itineraryToEdit);
      const userItineraryRecord = await this.user_itinerariesModel.findOne({
        where: {
          userId: userId,
          itineraryId: itineraryId,
        },
      });
      console.log("userItineraryRecord", userItineraryRecord);

      // Check if the user is the creator
      if (!userItineraryRecord.isCreator) {
        throw new Error(
          "Only the creator can edit new activity in this itinerary"
        );
      }
      await itineraryToEdit.update(itineraryToAdd);

      return res.json(itineraryToEdit);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  

module.exports = InstructionsController;

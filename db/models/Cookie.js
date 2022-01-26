const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const CookieSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 5 },
  description: String,
  image: String,
});

CookieSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Cookie", CookieSchema);

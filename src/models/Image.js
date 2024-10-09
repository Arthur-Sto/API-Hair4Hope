import {Schema,model} from "mongoose"
import { fileTypeFromBuffer } from "file-type"


const ImageSchema = new Schema({
    Nome : {type:String, default:""},
    Arquivo:{type:String, required:true},
    Ext: {type:String,required:false}
}, {versionKey:false})

ImageSchema.pre("save", async function(next){
    this.Nome = this._id + "."+this.Ext

    const fileType = await fileTypeFromBuffer(Buffer.from(this.Arquivo,"base64"))

    this.Ext = fileType.ext

    return next()
})
export const Image = model("Image",ImageSchema)



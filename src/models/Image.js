import {Schema,model} from "mongoose"



const ImageSchema = new Schema({
    Nome : {type:String, default:""},
    Arquivo:{type:String, required:true},
    Ext: {type:String,required:true}
}, {versionKey:false})

ImageSchema.pre("save", async function(next){
    this.Nome = this._id + "."+this.Ext

    
    return next()
})
export const Image = model("Image",ImageSchema)



import User from '../models/User.js';

export const createUserService = (body) => User.create(body);

export const findAllService = () => User.find();

export const findByIdService = (id) => User.findById(id);

export const updateService = (id, name, email, password, tipoCabelo, Coloracao, AdicionaisCabelo  ) => User.findOneAndUpdate({_id: id}, {name, email, password, tipoCabelo, Coloracao, AdicionaisCabelo  });

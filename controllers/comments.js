const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const User = require('../models/user');
const Movie = require('../models/movie');


require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
import Turbolinks from 'turbolinks'

import '../stylesheets/application'
import './bootstrap_custom.js'
import setupCSRFtoken from './setupCSRFtoken'

//Import React
import {} from '../components'

Turbolinks.start();
setupCSRFtoken()


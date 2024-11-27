import axios from 'axios';

import CONFIG from '@/config';

const CARHOPPER_API_V1 = axios.create({
  baseURL: CONFIG.CARHOPPER_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export { CARHOPPER_API_V1 };

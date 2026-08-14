export type Region =
  | 'north'
  | 'northeast'
  | 'central'
  | 'east'
  | 'west'
  | 'south'

export interface Province {
  id: string
  nameTh: string
  nameEn: string
  region: Region
  lat: number
  lng: number
}

export const regionLabel: Record<Region, string> = {
  north: 'ภาคเหนือ',
  northeast: 'ภาคตะวันออกเฉียงเหนือ',
  central: 'ภาคกลาง',
  east: 'ภาคตะวันออก',
  west: 'ภาคตะวันตก',
  south: 'ภาคใต้',
}

export const provinces: Province[] = [
  // ภาคเหนือ (9 จังหวัด)
  { id: 'chiang-mai', nameTh: 'เชียงใหม่', nameEn: 'Chiang Mai', region: 'north', lat: 18.7883, lng: 98.9853 },
  { id: 'chiang-rai', nameTh: 'เชียงราย', nameEn: 'Chiang Rai', region: 'north', lat: 19.9105, lng: 99.8406 },
  { id: 'lampang', nameTh: 'ลำปาง', nameEn: 'Lampang', region: 'north', lat: 18.2888, lng: 99.4900 },
  { id: 'lamphun', nameTh: 'ลำพูน', nameEn: 'Lamphun', region: 'north', lat: 18.5744, lng: 99.0087 },
  { id: 'mae-hong-son', nameTh: 'แม่ฮ่องสอน', nameEn: 'Mae Hong Son', region: 'north', lat: 19.3020, lng: 97.9654 },
  { id: 'nan', nameTh: 'น่าน', nameEn: 'Nan', region: 'north', lat: 18.7756, lng: 100.7730 },
  { id: 'phayao', nameTh: 'พะเยา', nameEn: 'Phayao', region: 'north', lat: 19.1664, lng: 99.9017 },
  { id: 'phrae', nameTh: 'แพร่', nameEn: 'Phrae', region: 'north', lat: 18.1445, lng: 100.1405 },
  { id: 'uttaradit', nameTh: 'อุตรดิตถ์', nameEn: 'Uttaradit', region: 'north', lat: 17.6200, lng: 100.0993 },

  // ภาคตะวันออกเฉียงเหนือ (20 จังหวัด)
  { id: 'kalasin', nameTh: 'กาฬสินธุ์', nameEn: 'Kalasin', region: 'northeast', lat: 16.4315, lng: 103.5060 },
  { id: 'khon-kaen', nameTh: 'ขอนแก่น', nameEn: 'Khon Kaen', region: 'northeast', lat: 16.4419, lng: 102.8360 },
  { id: 'chaiyaphum', nameTh: 'ชัยภูมิ', nameEn: 'Chaiyaphum', region: 'northeast', lat: 15.8068, lng: 102.0317 },
  { id: 'nakhon-phanom', nameTh: 'นครพนม', nameEn: 'Nakhon Phanom', region: 'northeast', lat: 17.4048, lng: 104.7692 },
  { id: 'nakhon-ratchasima', nameTh: 'นครราชสีมา', nameEn: 'Nakhon Ratchasima', region: 'northeast', lat: 14.9799, lng: 102.0977 },
  { id: 'bueng-kan', nameTh: 'บึงกาฬ', nameEn: 'Bueng Kan', region: 'northeast', lat: 18.3609, lng: 103.6466 },
  { id: 'buriram', nameTh: 'บุรีรัมย์', nameEn: 'Buriram', region: 'northeast', lat: 14.9951, lng: 103.1029 },
  { id: 'maha-sarakham', nameTh: 'มหาสารคาม', nameEn: 'Maha Sarakham', region: 'northeast', lat: 16.1850, lng: 103.3000 },
  { id: 'mukdahan', nameTh: 'มุกดาหาร', nameEn: 'Mukdahan', region: 'northeast', lat: 16.5450, lng: 104.7239 },
  { id: 'yasothon', nameTh: 'ยโสธร', nameEn: 'Yasothon', region: 'northeast', lat: 15.7924, lng: 104.1450 },
  { id: 'roi-et', nameTh: 'ร้อยเอ็ด', nameEn: 'Roi Et', region: 'northeast', lat: 16.0538, lng: 103.6520 },
  { id: 'loei', nameTh: 'เลย', nameEn: 'Loei', region: 'northeast', lat: 17.4860, lng: 101.7223 },
  { id: 'sisaket', nameTh: 'ศรีสะเกษ', nameEn: 'Sisaket', region: 'northeast', lat: 15.1186, lng: 104.3220 },
  { id: 'sakon-nakhon', nameTh: 'สกลนคร', nameEn: 'Sakon Nakhon', region: 'northeast', lat: 17.1547, lng: 104.1420 },
  { id: 'surin', nameTh: 'สุรินทร์', nameEn: 'Surin', region: 'northeast', lat: 14.8818, lng: 103.4936 },
  { id: 'nong-khai', nameTh: 'หนองคาย', nameEn: 'Nong Khai', region: 'northeast', lat: 17.8783, lng: 102.7420 },
  { id: 'nong-bua-lamphu', nameTh: 'หนองบัวลำภู', nameEn: 'Nong Bua Lamphu', region: 'northeast', lat: 17.2216, lng: 102.4260 },
  { id: 'amnat-charoen', nameTh: 'อำนาจเจริญ', nameEn: 'Amnat Charoen', region: 'northeast', lat: 15.8656, lng: 104.6255 },
  { id: 'udon-thani', nameTh: 'อุดรธานี', nameEn: 'Udon Thani', region: 'northeast', lat: 17.4139, lng: 102.7870 },
  { id: 'ubon-ratchathani', nameTh: 'อุบลราชธานี', nameEn: 'Ubon Ratchathani', region: 'northeast', lat: 15.2287, lng: 104.8564 },

  // ภาคกลาง (22 จังหวัด)
  { id: 'bangkok', nameTh: 'กรุงเทพมหานคร', nameEn: 'Bangkok', region: 'central', lat: 13.7563, lng: 100.5018 },
  { id: 'kamphaeng-phet', nameTh: 'กำแพงเพชร', nameEn: 'Kamphaeng Phet', region: 'central', lat: 16.4828, lng: 99.5226 },
  { id: 'chai-nat', nameTh: 'ชัยนาท', nameEn: 'Chai Nat', region: 'central', lat: 15.1852, lng: 100.1250 },
  { id: 'nakhon-nayok', nameTh: 'นครนายก', nameEn: 'Nakhon Nayok', region: 'central', lat: 14.2069, lng: 101.2130 },
  { id: 'nakhon-pathom', nameTh: 'นครปฐม', nameEn: 'Nakhon Pathom', region: 'central', lat: 13.8199, lng: 100.0620 },
  { id: 'nakhon-sawan', nameTh: 'นครสวรรค์', nameEn: 'Nakhon Sawan', region: 'central', lat: 15.7030, lng: 100.1370 },
  { id: 'nonthaburi', nameTh: 'นนทบุรี', nameEn: 'Nonthaburi', region: 'central', lat: 13.8622, lng: 100.5136 },
  { id: 'pathum-thani', nameTh: 'ปทุมธานี', nameEn: 'Pathum Thani', region: 'central', lat: 14.0208, lng: 100.5250 },
  { id: 'ayutthaya', nameTh: 'พระนครศรีอยุธยา', nameEn: 'Ayutthaya', region: 'central', lat: 14.3532, lng: 100.5686 },
  { id: 'phichit', nameTh: 'พิจิตร', nameEn: 'Phichit', region: 'central', lat: 16.4420, lng: 100.3487 },
  { id: 'phitsanulok', nameTh: 'พิษณุโลก', nameEn: 'Phitsanulok', region: 'central', lat: 16.8211, lng: 100.2659 },
  { id: 'phetchabun', nameTh: 'เพชรบูรณ์', nameEn: 'Phetchabun', region: 'central', lat: 16.4194, lng: 101.1591 },
  { id: 'lopburi', nameTh: 'ลพบุรี', nameEn: 'Lopburi', region: 'central', lat: 14.7995, lng: 100.6534 },
  { id: 'samut-prakan', nameTh: 'สมุทรปราการ', nameEn: 'Samut Prakan', region: 'central', lat: 13.5990, lng: 100.5998 },
  { id: 'samut-songkhram', nameTh: 'สมุทรสงคราม', nameEn: 'Samut Songkhram', region: 'central', lat: 13.4098, lng: 100.0022 },
  { id: 'samut-sakhon', nameTh: 'สมุทรสาคร', nameEn: 'Samut Sakhon', region: 'central', lat: 13.5475, lng: 100.2740 },
  { id: 'sing-buri', nameTh: 'สิงห์บุรี', nameEn: 'Sing Buri', region: 'central', lat: 14.8909, lng: 100.3970 },
  { id: 'sukhothai', nameTh: 'สุโขทัย', nameEn: 'Sukhothai', region: 'central', lat: 17.0068, lng: 99.8265 },
  { id: 'suphan-buri', nameTh: 'สุพรรณบุรี', nameEn: 'Suphan Buri', region: 'central', lat: 14.4744, lng: 100.1177 },
  { id: 'saraburi', nameTh: 'สระบุรี', nameEn: 'Saraburi', region: 'central', lat: 14.5289, lng: 100.9107 },
  { id: 'ang-thong', nameTh: 'อ่างทอง', nameEn: 'Ang Thong', region: 'central', lat: 14.5896, lng: 100.4549 },
  { id: 'uthai-thani', nameTh: 'อุทัยธานี', nameEn: 'Uthai Thani', region: 'central', lat: 15.3835, lng: 100.0248 },

  // ภาคตะวันออก (7 จังหวัด)
  { id: 'chanthaburi', nameTh: 'จันทบุรี', nameEn: 'Chanthaburi', region: 'east', lat: 12.6112, lng: 102.1038 },
  { id: 'chachoengsao', nameTh: 'ฉะเชิงเทรา', nameEn: 'Chachoengsao', region: 'east', lat: 13.6904, lng: 101.0779 },
  { id: 'chonburi', nameTh: 'ชลบุรี', nameEn: 'Chonburi', region: 'east', lat: 13.3611, lng: 100.9847 },
  { id: 'trat', nameTh: 'ตราด', nameEn: 'Trat', region: 'east', lat: 12.2428, lng: 102.5178 },
  { id: 'prachinburi', nameTh: 'ปราจีนบุรี', nameEn: 'Prachinburi', region: 'east', lat: 14.0509, lng: 101.3720 },
  { id: 'rayong', nameTh: 'ระยอง', nameEn: 'Rayong', region: 'east', lat: 12.6814, lng: 101.2816 },
  { id: 'sa-kaeo', nameTh: 'สระแก้ว', nameEn: 'Sa Kaeo', region: 'east', lat: 13.8244, lng: 102.0645 },

  // ภาคตะวันตก (5 จังหวัด)
  { id: 'kanchanaburi', nameTh: 'กาญจนบุรี', nameEn: 'Kanchanaburi', region: 'west', lat: 14.0227, lng: 99.5328 },
  { id: 'tak', nameTh: 'ตาก', nameEn: 'Tak', region: 'west', lat: 16.8840, lng: 99.1258 },
  { id: 'prachuap-khiri-khan', nameTh: 'ประจวบคีรีขันธ์', nameEn: 'Prachuap Khiri Khan', region: 'west', lat: 11.8126, lng: 99.7957 },
  { id: 'phetchaburi', nameTh: 'เพชรบุรี', nameEn: 'Phetchaburi', region: 'west', lat: 13.1119, lng: 99.9440 },
  { id: 'ratchaburi', nameTh: 'ราชบุรี', nameEn: 'Ratchaburi', region: 'west', lat: 13.5282, lng: 99.8134 },

  // ภาคใต้ (14 จังหวัด)
  { id: 'krabi', nameTh: 'กระบี่', nameEn: 'Krabi', region: 'south', lat: 8.0863, lng: 98.9063 },
  { id: 'chumphon', nameTh: 'ชุมพร', nameEn: 'Chumphon', region: 'south', lat: 10.4930, lng: 99.1800 },
  { id: 'trang', nameTh: 'ตรัง', nameEn: 'Trang', region: 'south', lat: 7.5563, lng: 99.6114 },
  { id: 'nakhon-si-thammarat', nameTh: 'นครศรีธรรมราช', nameEn: 'Nakhon Si Thammarat', region: 'south', lat: 8.4304, lng: 99.9631 },
  { id: 'narathiwat', nameTh: 'นราธิวาส', nameEn: 'Narathiwat', region: 'south', lat: 6.4254, lng: 101.8253 },
  { id: 'pattani', nameTh: 'ปัตตานี', nameEn: 'Pattani', region: 'south', lat: 6.8692, lng: 101.2500 },
  { id: 'phangnga', nameTh: 'พังงา', nameEn: 'Phang Nga', region: 'south', lat: 8.4510, lng: 98.5310 },
  { id: 'phatthalung', nameTh: 'พัทลุง', nameEn: 'Phatthalung', region: 'south', lat: 7.6167, lng: 100.0740 },
  { id: 'phuket', nameTh: 'ภูเก็ต', nameEn: 'Phuket', region: 'south', lat: 7.8804, lng: 98.3923 },
  { id: 'yala', nameTh: 'ยะลา', nameEn: 'Yala', region: 'south', lat: 6.5410, lng: 101.2800 },
  { id: 'ranong', nameTh: 'ระนอง', nameEn: 'Ranong', region: 'south', lat: 9.9528, lng: 98.6084 },
  { id: 'songkhla', nameTh: 'สงขลา', nameEn: 'Songkhla', region: 'south', lat: 7.1897, lng: 100.5951 },
  { id: 'satun', nameTh: 'สตูล', nameEn: 'Satun', region: 'south', lat: 6.6238, lng: 100.0673 },
  { id: 'surat-thani', nameTh: 'สุราษฎร์ธานี', nameEn: 'Surat Thani', region: 'south', lat: 9.1382, lng: 99.3215 },
]
const mongoose = require('mongoose');
const Product = require('./models/product.js'); // Adjust the path if your Product model is in another folder

mongoose.connect('mongodb://127.0.0.1:27017/pharmacy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seed() {
  try {
    await Product.deleteMany(); // Optional: clears existing products
    await Product.insertMany([
      {
        name: 'Amoxicillin',
        description: 'Treats bacterial infections',
        price: 20,
        imageUrl: './resource/medicine/amoxicillin-drugs3.jpg',
        stock: 50,
        ageGroup: 'general',
        category: 'medicine'
      },
      {
        name: 'Antacide',
        description: 'Gastrointestinal medication or acid reducer',
        price: 150,
        imageUrl: './resource/medicine/antacid.jpeg',
        stock: 100,
        ageGroup: 'general',
        category: 'medicine'
      },
      {
        name: 'Paracetamol',
        description: 'Used to treat pain and fever',
        price: 15,
        imageUrl: './resource/medicine/painRel.jpeg',
        stock: 100,
        ageGroup: 'general',
        category: 'medicine'
      },
      {
        name: 'Antihistamine',
        description: 'Antihistamines help relieve allergies, colds, and itching by blocking histamine',
        price: 50,
        imageUrl: './resource/medicine/antihistamine.jpg',
        stock: 100,
        ageGroup: 'general',
        category: 'medicine'
      },

      {
        name: 'Aspirin',
        description: 'Aspirin relieves pain, reduces fever, lowers inflammation, and prevents blood clots. ',
        price: 70,
        imageUrl: './resource/medicine/aspirin.jpg',
        stock: 100,
        ageGroup: 'general',
        category: 'medicine'
      },
      
      {
        name: 'Cough Syrup',
        description: 'Treats coughs; expectorants loosen mucus, suppressants reduce coughing. Some soothe the throat. ',
        price: 200,
        imageUrl: './resource/medicine/cough.jpeg',
        stock: 100,
        ageGroup: 'general',
        category: 'medicine'
      },

      {
        name: 'Dettol',
        description: 'A disinfectant and antiseptic used for wound cleansing, skin disinfection, and household hygiene. It kills germs and protects against infections. ',
        price: 100,
        imageUrl: './resource/medicine/detol.jpg',
        stock: 100,
        ageGroup: 'general',
        category: 'medicine'
      },

      {
        name: 'Finasteride',
        description: 'Used to treat male pattern hair loss and enlarged prostate (BPH). It works by reducing DHT, a hormone linked to hair loss and prostate growth.',
        price: 300,
        imageUrl: './resource/medicine/finastraide.jpg',
        stock: 100,
        ageGroup: 'general',
        category: 'medicine'
      },

      {
        name: 'Fluconazole',
        description: 'An antifungal medication used to treat yeast infections, including vaginal, oral, and systemic fungal infections. It works by stopping fungal growth',
        price: 200,
        imageUrl: './resource/medicine/fluconazol.jpg',
        stock: 100,
        ageGroup: 'general',
        category: 'medicine'
      },

      {
        name: 'Gravol',
        description: ' Used to prevent and treat nausea, vomiting, and motion sickness. It also helps with vertigo and dizziness.',
        price: 200,
        imageUrl: './resource/medicine/gravol.jpg',
        stock: 100,
        ageGroup: 'general',
        category: 'medicine'
      },

      {
        name: 'Hamfer Iron Supplement',
        description: ' Used to treat iron deficiency and anemia. It contains iron, folic acid, and vitamin B12 to support red blood cell production and overall blood health.',
        price: 350,
        imageUrl: './resource/medicine/hamfer iron supliment.jpg',
        stock: 100,
        ageGroup: 'general',
        category: 'medicine'
      },

      {
        name: 'Ibuprofen',
        description: ' A nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain, reduce fever, and lower inflammation. It helps with headaches, muscle pain, arthritis, and menstrual cramps.',
        price: 350,
        imageUrl: './resource/medicine/ibuprofen.jpg',
        stock: 100,
        ageGroup: 'general',
        category: 'medicine'
      },

      {
        name: 'Levothyroxine',
        description: 'Used to treat hypothyroidism (underactive thyroid). It replaces thyroid hormones to regulate metabolism, energy, and overall body function.',
        price: 350,
        imageUrl: './resource/medicine/levojpg.jpg',
        stock: 100,
        ageGroup: 'general',
        category: 'medicine'
      },

      {
        name: 'Metformin',
        description: 'A medication used to manage type 2 diabetes by lowering blood sugar levels. It improves insulin sensitivity and reduces glucose production.',
        price: 250,
        imageUrl: './resource/medicine/metro.jpg',
        stock: 100,
        ageGroup: 'general',
        category: 'medicine'
      },

      {
        name: 'Minoxidil',
        description: 'Used to treat hair loss by promoting hair growth. It increases blood flow to hair follicles and is available as a topical solution',
        price: 850,
        imageUrl: './resource/medicine/minoxidil.jpg',
        stock: 100,
        ageGroup: 'general',
        category: 'medicine'
      },

      {
        name: 'Sudafed PE',
        description: 'A decongestant used to relieve nasal congestion and sinus pressure caused by colds, allergies, and hay fever. It contains phenylephrine, which shrinks blood vessels in the nasal passages to reduce swelling. ',
        price: 250,
        imageUrl: './resource/medicine/nasal decongestants.jpg',
        stock: 100,
        ageGroup: 'general',
        category: 'medicine'
      },

      {
        name: 'vitamin c serums',
        description: 'Brighten skin, reduce hyperpigmentation, boost collagen, and protect against sun damage. They also hydrate and strengthen the skin barrier.',
        price: 350,
        imageUrl: './resource/medicine/vitamin c.jpg',
        stock: 100,
        ageGroup: 'general',
        category: 'medicine'
      },
      

      {
        name: 'Vitamin E capsule',
        description: 'Used to support skin, hair, and immune health. They act as antioxidants, protecting cells from damage and promoting overall wellness. ',
        price: 250,
        imageUrl: './resource/medicine/vitamin-E supplyment.jpg',
        stock: 100,
        ageGroup: 'general',
        category: 'medicine'
      },
      
// Medical product 
      // kids section 
      {
        name: 'Peadiasure',
        description: 'A nutritional supplement for children that supports growth, development, and immune function. It contains essential vitamins, minerals, and protein to help meet dietary needs.',
        price: 350,
        imageUrl: './resource/medical/pediasure.jpg',
        stock: 100,
        ageGroup: 'kids',
        category: 'medical'
      },
      
      
      {
        name: 'Junior Horlicks',
        description: ' A nutritional drink designed for children aged 2-6 years. It supports brain development, physical growth, and immune function with essential vitamins and minerals.',
        price: 350,
        imageUrl: './resource/medical/jr horlicks.jpg',
        stock: 100,
        ageGroup: 'kids',
        category: 'medical'
      },
      
      
      
      {
        name: 'Cerelac',
        description: 'A nutritious infant cereal by Nestlé, designed for babies 6 months and older. It supports growth, digestion, and immunity with essential vitamins, minerals, and probiotics.',
        price: 350,
        imageUrl: './resource/medical/cerelac.jpg',
        stock: 100,
        ageGroup: 'kids',
        category: 'medical'
      },
      
      {
        name: 'Johnsons Baby Lotion',
        description: 'A gentle moisturizer designed for baby\'s delicate skin. It helps keep skin soft, smooth, and hydrated while protecting against dryness.',
        price: 350,
        imageUrl: './resource/medical/johnsons babay lotion.jpg',
        stock: 100,
        ageGroup: 'kids',
        category: 'medical'
      },
      
      
      {
        name: 'Sebamed Baby Wash',
        description: 'A gentle, pH-balanced cleanser designed for baby’s delicate skin. It helps reduce dryness, soothe irritation, and maintain skin hydration',
        price: 450,
        imageUrl: './resource/medical/bodywash.jpg',
        stock: 100,
        ageGroup: 'kids',
        category: 'medical'
      },
      
      {
        name: 'Himalaya Baby Diapers',
        description: 'Designed for comfort and rash protection, these diapers contain Aloe Vera and Yashada Bhasma, which help prevent diaper rash and inhibit microbial growth. They also have a super absorbent polymer layer to keep babies dry and comfortable.',
        price: 250,
        imageUrl: './resource/medical/diper.jpg',
        stock: 100,
        ageGroup: 'kids',
        category: 'medical'
      },
      
      
      {
        name: 'Colicaid Drops',
        description: 'Used to relieve gas, bloating, and colic pain in infants. It contains Simethicone, Dill oil, and Fennel oil, which help ease digestion and reduce discomfort.',
        price: 250,
        imageUrl: './resource/medical/Colicaid Drops.jpg',
        stock: 100,
        ageGroup: 'kids',
        category: 'medical'
      },
      
      {
        name: 'Zincovit Drops',
        description: 'A multivitamin and multimineral supplement for children aged 1 to 3 years. It supports growth, immunity, and overall health with essential vitamins like A, B-complex, C, D3, and E, along with zinc and iodine',
        price: 250,
        imageUrl: './resource/medical/Zincovit Drops.jpg',
        stock: 100,
        ageGroup: 'kids',
        category: 'medical'
      },
      

      // adult section
      
      {
        name: 'Ensure',
        description: ' A nutritional supplement designed for adults to support muscle strength, immunity, and energy. It contains vitamins, minerals, protein, and fiber to help maintain overall health.',
        price: 450,
        imageUrl: './resource/medical/Ensure.jpg',
        stock: 100,
        ageGroup: 'adults',
        category: 'medical'
      },
      
      {
        name: 'Horlicks Protein+',
        description: ' A high-protein nutritional supplement designed for adults. It contains a blend of whey, soy, and casein proteins to support muscle strength, recovery, and overall health.',
        price: 450,
        imageUrl: './resource/medical/Horlicks Protein+.jpg',
        stock: 100,
        ageGroup: 'adults',
        category: 'medical'
      },
      
      {
        name: 'Kelloggs Special K',
        description: ' A breakfast cereal made from toasted rice, wheat, and barley. It’s marketed as a low-fat, nutritious option and has variations like Protein+, Red Berries, and Multigrain & Honey',
        price: 450,
        imageUrl: './resource/medical/Kelloggs Special K.jpg',
        stock: 100,
        ageGroup: 'adults',
        category: 'medical'
      },
      
      
      
      {
        name: 'Vaseline Intenive Care',
        description: ' A moisturizing lotion designed to hydrate and protect dry skin. It contains glycerin, mineral oil, and petrolatum, which help lock in moisture and soothe irritation.',
        price: 450,
        imageUrl: './resource/medical/Vaseline Intenive Care.jpg',
        stock: 100,
        ageGroup: 'adults',
        category: 'medical'
      },
      
      
      {
        name: 'Dove Body Wash',
        description: 'A moisturizing body cleanser designed to hydrate and nourish the skin. It contains gentle cleansers and Nutrium Moisture technology to help maintain the skin’s natural moisture barrier.',
        price: 450,
        imageUrl: './resource/medical/Dove Body Wash.jpg',
        stock: 100,
        ageGroup: 'adults',
        category: 'medical'
      },
      
      // senior section 
      
      {
        name: 'Protinex Senior',
        description: 'A nutritional supplement designed for older adults to support muscle strength, immunity, and overall health. It contains high-quality protein, vitamins, and minerals to help maintain energy and well-being.',
        price: 450,
        imageUrl: './resource/medical/Protinex Senior.jpg',
        stock: 100,
        ageGroup: 'seniors',
        category: 'medical'
      },
      
      
      {
        name: 'Bournvita 50+',
        description: 'A nutritional supplement designed for adults, enriched with Vitamin D, protein, and essential minerals to support bone strength, muscle health, and immunity.',
        price: 450,
        imageUrl: './resource/medical/Bournvita 50+.jpg',
        stock: 100,
        ageGroup: 'seniors',
        category: 'medical'
      },
      
      
      
      {
        name: 'Nestlé Resource Diabetic',
        description: ' A nutritional supplement designed for people with diabetes. It contains high protein, fiber, and a low glycemic index formula to help manage blood sugar levels, support muscle health, and aid digestion',
        price: 500,
        imageUrl: './resource/medical/Nestlé Resource Diabetic.jpg',
        stock: 10,
        ageGroup: 'seniors',
        category: 'medical'
      },
      
      {
        name: 'Cetaphil Moisturizing Lotion',
        description: 'A lightweight, fast-absorbing moisturizer designed for dry to normal skin. It provides 48-hour hydration, restores the skin’s moisture barrier, and is fragrance-free, hypoallergenic, and dermatologist-tested.',
        price: 500,
        imageUrl: './resource/medical/Cetaphil Moisturizing Lotion.jpg',
        stock: 10,
        ageGroup: 'seniors',
        category: 'medical'
      },
      
      {
        name: 'Savlon Herbal Body Wash',
        description: 'A gentle, germ-protecting body wash enriched with herbal extracts. It helps cleanse, moisturize, and protect the skin while leaving a refreshing fragrance.',
        price: 500,
        imageUrl: './resource/medical/Savlon Herbal Body Wash.jpg',
        stock: 10,
        ageGroup: 'seniors',
        category: 'medical'
      },

      //  GeneralSection 

      {
        name: 'Blood Pressure Monitors',
        description: ' Devices used to measure blood pressure levels. They help monitor hypertension, heart health, and medication effectiveness. Available in manual (sphygmomanometers) and digital versions for home or clinical use. ',
        price: 2000,
        imageUrl: './resource/medical/Blood Pressure Monitors.jpg',
        stock: 10,
        ageGroup: 'general',
        category: 'medical'
      },

      {
        name: 'Wheel Chair',
        description: 'Comfortable folding wheelchair',
        price: 5000,
        imageUrl: './resource/medical/Wheel Chair.jpg',
        stock: 10,
        ageGroup: 'general',
        category: 'medical'
      }

    ]);
    console.log('✅ Products seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    mongoose.connection.close();
  }
}

seed();

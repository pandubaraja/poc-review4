export const fakedraft = {
    "token": "123",
    "initial": true,
    "averageRatingValue": 4.2,
    "cleanliness": {
      "value": "option_5",
      "type": "RATING"
    },
    "facilities": {
      "value": "option_3",
      "type": "RATING"
    },
    "location": {
      "value": "option_5",
      "type": "RATING"
    },
    "value_for_money": {
      "value": "option_3",
      "type": "RATING"
    },
    "service": {
      "value": "option_5",
      "type": "RATING"
    },
    "primary": {
      "value": "",
      "validators": []
    },
    "comment": {
      "value": "test",
      "validators": [
        {
          "name": "required",
          "message": "Kamu belum ceritakan pengalamanmu.",
          "parameter": "required"
        }
      ]
    },
    "type_of_traveler": {
      "value": "",
      "validators": []
    },
    "images": [
      {
        "id": "image-1",
        "imagePreviewUrl": "blob:http://mario.tiket.com:3000/fb7e17ac-6535-45e8-97d5-ba0ffda3de67",
        "fileb64": ""
      },
      {
        "id": "image-2",
        "imagePreviewUrl": "",
        "fileb64": ""
      }
    ]
  }
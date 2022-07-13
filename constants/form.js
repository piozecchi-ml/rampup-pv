module.exports = Object.freeze({
  PLACE_ID: '1703373469_10142',
  DATA_MOCK: {
    last_updated: '09/07/2022 19:46 hs',
    shipments: [
      {
        id: 121212121,
        service_type: 0,
        recipient: { id: 1111111, name: 'Juan Perez' },
        status: 0,
        incoming_date: '07/07/2022 ',
        outgoing_date: '08/07/2022',
      },
      {
        id: 454545454,
        service_type: 0,
        recipient: { id: 2222222, name: 'Roberto Rodriguez' },
        status: 1,
        incoming_date: '08/07/2022 ',
        outgoing_date: '11/07/2022',
      },
      {
        id: 787878787,
        service_type: 2,
        recipient: { id: 3333333, name: 'Pedro Reyes' },
        status: 1,
        incoming_date: '09/07/2022 ',
        outgoing_date: '10/07/2022',
      },
    ],
  },
});

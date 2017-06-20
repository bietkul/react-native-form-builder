
export default {
  fields: [
    {
      type: 'text',
      name: 'user_name',
      required: true,
      label: 'Username',
      defaultValue: 'kuldeep',
      editable: false,
    },
    {
      type: 'group',
      name: 'address1',
      label: 'Address',
      fields: [
        {
          type: 'text',
          name: 'city',
          label: 'City',
        },
        {
          type: 'text',
          name: 'country',
          label: 'Country',
        },
      ],
    },
    {
      type: 'password',
      name: 'password',
      secureTextEntry: true,
      required: true,
      label: 'Password',
      defaultValue: '123',
    },
    {
      type: 'email',
      name: 'email',
      required: true,
      label: 'Email',
      defaultValue: 'www.jiji@jij.com',
    },
    {
      type: 'number',
      name: 'number',
      required: true,
      label: 'Number',
      defaultValue: '2',
    },
    {
      type: 'url',
      name: 'url',
      required: true,
      label: 'URL',
      defaultValue: 'www.jiji.com',
    },
    {
      type: 'select', // required
      name: 'select', // required
      multiple: true, // default false
      required: true, // default false
      label: 'SELECT', // required
      labelKey: 'name', // tells the display key (required)
      primaryKey: 'id', // tells the unique key (required)
      objectType: true, // tells the type of values is object default false
      options: [ // required
        {
          id: 1,
          name: 'kuldeep',
          title: 'saxena',
        },
        {
          id: 2,
          name: 'kuldeep1',
          title: 'saxena1',
        },
        {
          id: 3,
          name: 'kuldeep2',
          title: 'saxena2',
        },
      ],
      // options: ['CAR', 'BIKE', 'BICYCLE'],
      defaultValue: [{  // In case of multiple it will be an array otherwise it will be an object
        id: 3,
        name: 'kuldeep2',
        title: 'saxena2',
      }],
      // defaultValue: ['CAR', 'BIKE'],
    },
    {
      type: 'text',
      name: 'address',
      label: 'Address',
      required: true,
      numberOfLines: 3,
      multiline: true,
    },
    {
      type: 'url',
      name: 'urllxs',
      required: true,
      label: 'URL',
    },
    {
      type: 'picker',
      name: 'picker',
      editable: false,
      mode: 'dialog',
      label: 'Select One',
      defaultValue: 'BIKE',
      options: ['CAR', 'BIKE', 'BICYCLE'],
    },
    {
      type: 'switch',
      name: 'switch',
      label: 'Notify Me',
      defaultValue: true,
    },
    {
      type: 'slider',
      name: 'select_distance',
      label: 'Select Distance',
      minimumValue: 10,
      maximumValue: 1000,
    },
    {
      type: 'date',
      mode: 'date',
      name: 'D-T', // D, T, D-T
      label: 'Select Date',
      maxDate: new Date(2017, 3, 13),
      minDate: new Date(2017, 2, 13),
    },
  ],
};

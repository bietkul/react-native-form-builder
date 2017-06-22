export default {
  fields: [
    {
      type: 'text',
      name: 'user_name',
      icon: 'ios-person',
      iconOrientation: 'right',
      required: true,
      label: 'Username',
      editable: true,
      props: {}, /* If you want to add some extra props like autoCapitalize or
      autoFocus only available for textInput*/
    },
    {
      type: 'password',
      name: 'password',
      icon: 'ios-lock',
      required: true,
      label: 'Password',
      props: {
        secureTextEntry: true,
      },
    },
    {
      type: 'date',
      mode: 'date', // 'time', 'datetime'
      name: 'birthday',
      label: 'Birthday',
      maxDate: new Date(2010, 7, 1),
    },
    {
      type: 'group',
      name: 'work_address',
      label: 'Address',
      fields: [
        {
          type: 'text',
          name: 'city',
          label: 'City',
          // defaultValue: 'Bangalore',
        },
        {
          type: 'text',
          name: 'country',
          label: 'Country',
          // defaultValue: 'India',
        },
      ],
    },
    {
      type: 'select', // required
      name: 'select', // required
      multiple: true, // default false
      required: true, // default false
      label: 'Select', // required
      labelKey: 'name', // tells the display key (required)
      primaryKey: 'id', // tells the unique key (required)
      objectType: true, // tells the type of values is object default false
      options: [ // required
        {
          id: 1,
          name: 'CAR',
        },
        {
          id: 2,
          name: 'BIKE',
        },
        {
          id: 3,
          name: 'BICYCLE',
        },
      ],
      // options: ['CAR', 'BIKE', 'BICYCLE'],
      defaultValue: [{  // In case of multiple it will be an array otherwise it will be an object
        id: 3,
        name: 'BICYCLE',
      }],
      // defaultValue: ['CAR', 'BIKE'],
    },
    {
      type: 'select', // required
      name: 'status', // required
      label: 'Status', // required
      options: ['In Meeting', 'Busy', 'Happy', 'Sad'],
      defaultValue: ['Happy'],
    },
    {
      type: 'switch',
      name: 'switch',
      label: 'Notify Me',
      defaultValue: true,
    },
    {
      type: 'text',
      name: 'description',
      label: 'Describe Yourself',
      required: true,
      props: {
        multiline: true,
        numberOfLines: 3,
      },
    },
    {
      type: 'email',
      name: 'email',
      required: true,
      label: 'Email',
      // defaultValue: 'www.jiji@jij.com',
    },
    {
      type: 'number',
      name: 'number',
      required: true,
      label: 'Age',
      // defaultValue: 18,
    },
    {
      type: 'url',
      name: 'url',
      required: true,
      label: 'URL',
      // defaultValue: 'www.github.com',
    },
  ],
};

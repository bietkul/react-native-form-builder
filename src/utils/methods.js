export function getKeyboardType(textType) {
    switch (textType) {
      case 'email':
        return 'email-address';
      case 'number':
        return 'numeric';
      default:
        return 'default';

    }
  }

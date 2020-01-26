
export const Types = {
  LOAD: 'conversation/LOAD',
  CREATE: 'conversation/CREATE',
  REMOVE: 'conversation/REMOVE',
  REMOVE_ALL: 'conversation/REMOVE_ALL'
}

const INITIAL_STATE = [
  {
    uuid: 'uuid1',
    id: 1,
    name: 'Chandani Singh',
    avatar: 'https://images.pexels.com/photos/921646/pexels-photo-921646.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    lastMessage: {
      text: 'Let"s play video game!',
      sentAt: '09:32',
      origin: 'receiver'
    }
  },
  {
    uuid: 'uuid2',
    id: 2,
    name: 'Chandani Singh',
    avatar: 'https://images.pexels.com/photos/1071049/pexels-photo-1071049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=90',
    lastMessage: {
      text: 'eu fui ontem',
      sentAt: '21:10',
      origin: 'receiver'
    }
  },
  {
    uuid: 'uuid3',
    id: 3,
    name: 'Chandani Singh',
    avatar: 'https://images.pexels.com/photos/1903881/pexels-photo-1903881.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    lastMessage: {
      text: 'nao sei man',
      sentAt: '19:08',
      origin: 'sender'
    }
  },
  {
    uuid: 'uuid4',
    id: 4,
    name: 'Chandani Singh',
    avatar: 'https://images.pexels.com/photos/1559672/pexels-photo-1559672.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    lastMessage: {
      text: 'eu fui ontem',
      sentAt: '21:10',
      origin: 'receiver'
    }
  },
  {
    uuid: 'uuid5',
    id: 5,
    name: 'Chandani Singh',
    avatar: 'https://images.pexels.com/photos/776552/pexels-photo-776552.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    lastMessage: {
      text: 'nao sei man',
      sentAt: '19:08',
      origin: 'receiver'
    }
  },
  {
    uuid: 'uuid1',
    id: 1,
    name: 'Chandani Singh',
    avatar: 'https://images.pexels.com/photos/432497/pexels-photo-432497.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    lastMessage: {
      text: 'Let"s play video game!',
      sentAt: '09:32',
      origin: 'receiver'
    }
  },
  {
    uuid: 'uuid2',
    id: 2,
    name: 'Chandani Singh',
    avatar: 'https://images.pexels.com/photos/247297/pexels-photo-247297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    lastMessage: {
      text: 'eu fui ontem',
      sentAt: '21:10',
      origin: 'receiver'
    }
  },
  {
    uuid: 'uuid3',
    id: 3,
    name: 'Chandani Singh',
    avatar: 'https://images.pexels.com/photos/1144171/pexels-photo-1144171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    lastMessage: {
      text: 'nao sei man',
      sentAt: '19:08',
      origin: 'sender'
    }
  },
  {
    uuid: 'uuid4',
    id: 4,
    name: 'Chandani Singh',
    avatar: 'https://images.pexels.com/photos/1628239/pexels-photo-1628239.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    lastMessage: {
      text: 'eu fui ontem',
      sentAt: '21:10',
      origin: 'receiver'
    }
  },
  {
    uuid: 'uuid5',
    id: 5,
    name: 'Chandani Singh',
    avatar: 'https://images.pexels.com/photos/919383/pexels-photo-919383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    lastMessage: {
      text: 'nao sei man',
      sentAt: '19:08',
      origin: 'receiver'
    }
  }

]

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.LOAD:
      return [...action.conversations]
    case Types.CREATE:
      return [action.conversation, ...state]
    case Types.REMOVE:
      return state.filter(conversation => conversation.id !== action.id)
    case Types.REMOVE_ALL:
      return []
    default:
      return state
  }
}

export const load = conversations => ({ type: Types.LOAD, conversations })
export const create = conversation => ({ type: Types.CREATE, conversation })
export const remove = id => ({ type: Types.REMOVE, id })
export const removeAll = () => ({ type: Types.REMOVE_ALL })

export default reducer

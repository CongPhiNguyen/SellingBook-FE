import * as type from '../types'

export const userLogin = () => async dispathch => {
        dispathch({
        type: type.GET_POST,
        payload: ['1st post', '2 nd post', '3st post']
    })
}


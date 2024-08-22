export type InitialStateModalType = {
    isVisible: boolean
    title: string
    body: string
    typeModal?: 'fail' | 'success'
}

export type ActionModalType =
    | {
          type: 'SET_OPEN'
          body?: string | undefined
          title?: string | undefined
          typeModal?: 'fail' | 'success'
      }
    | {
          type: 'SET_CLOSE'
      }

export const InitialStateModal: InitialStateModalType = {
    isVisible: false,
    title: '',
    body: '',
    typeModal: undefined,
}
export const modalReducer = (
    state: InitialStateModalType,
    action: ActionModalType
) => {
    switch (action.type) {
        case 'SET_OPEN':
            return {
                isVisible: true,
                body: action.body ?? '',
                title: action.title ?? '',
                typeModal: action.typeModal,
            }
        case 'SET_CLOSE':
            return {
                ...state,
                isVisible: false,
            }
        default:
            return state
    }
}

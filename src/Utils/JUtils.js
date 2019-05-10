import  _ from 'lodash'

export function JParse(jsonstr)
{
    if(_.isEmpty(jsonstr))
    {
        return {}
    }
    if(typeof jsonstr === 'string')
        return JSON.parse(JSON.stringify(jsonstr))
    return jsonstr
}

import  {get,post,put,del} from './API';

export const countryDic = p => get('study/countrydic', p);
export const studyList = p => get(`study/studies/${p.id}`,p);
export const createStudy = p => post(`study/study`, p);
export const getStudyDetail = p => get(`study/studies/${p.id}`, "");
export const updateStudy = p => put(`study/studies/${p.id}`, "");
export const delStudy = p => del(`study/studies/${p.id}`, "");



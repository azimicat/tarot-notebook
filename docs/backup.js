const StudyBackup = (() => {
 const format = 'tsuki-study-backup';
 const maxBytes = 2 * 1024 * 1024;
 const modes = new Set(['すべて','復習','大アルカナ','小アルカナ','ワンド','カップ','ソード','ペンタクル','基礎と配置','基礎','スプレッド']);
 const object = v => v !== null && typeof v === 'object' && !Array.isArray(v);
 const integer = v => Number.isSafeInteger(v) && v >= 0 && v <= 1000000000;
 function validate(data) {
  const invalid = () => { throw new Error('学習データの内容が正しくありません。月の手帖からダウンロードしたJSONファイルを選んでください。'); };
  if (!object(data) || !object(data.answers) || !Array.isArray(data.history) || data.history.length > 50) invalid();
  if (data.readOrder !== undefined && !['random','number'].includes(data.readOrder)) invalid();
  const ids = new Set(questions.map(q => q.id));
  const answers = {};
  for (const [id,a] of Object.entries(data.answers)) {
   if (!ids.has(id) || !object(a) || !integer(a.count) || a.count < 1 || !integer(a.correct) || a.correct > a.count || typeof a.last !== 'boolean' || typeof a.wrong !== 'boolean' || a.last === a.wrong) invalid();
   answers[id] = {count:a.count,correct:a.correct,last:a.last,wrong:a.wrong};
  }
  const history = data.history.map(h => {
   if (!object(h) || typeof h.date !== 'string' || !/^\d{4}-\d{2}-\d{2}T/.test(h.date) || !Number.isFinite(Date.parse(h.date)) || !modes.has(h.mode) || !integer(h.count) || h.count < 1 || h.count > 10 || (h.type !== undefined && !['read','quiz'].includes(h.type))) invalid();
   const record = {date:new Date(h.date).toISOString(),mode:h.mode,count:h.count};
   if (h.type === 'read') record.type = 'read';
   else { if (!integer(h.score) || h.score > h.count) invalid(); record.score = h.score; }
   return record;
  });
  return {answers,history,readOrder:data.readOrder || 'random'};
 }
 function parse(text) {
  let file;
  try { file = JSON.parse(text); } catch { throw new Error('JSONファイルを読み取れませんでした。ファイルが壊れていないか確認してください。'); }
  if (!object(file) || file.format !== format) throw new Error('月の手帖のバックアップファイルではありません。');
  if (file.version !== 1) throw new Error('このバックアップのバージョンには対応していません。');
  return validate(file.data);
 }
 function serialize(data) { return JSON.stringify({format,version:1,exportedAt:new Date().toISOString(),data:validate(data)},null,2); }
 return {maxBytes,validate,parse,serialize};
})();

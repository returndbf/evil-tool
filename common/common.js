import {throwNotInBrowserErrInfo} from "./utils.js";
import fs from "node:fs"
import path from "node:path"
import dayjs from "dayjs";

export async function wait(delay=1000,resolveInfo){
    return await new Promise(res=>{
        setTimeout(()=>{
            res(resolveInfo)
        },delay)
    })
}



export const urlSearch = (url = undefined) =>{
    let innerUrl = ""
    let instance = null

    throwNotInBrowserErrInfo(!url, `give me url,u idiot!u aren't in browser!!!`)
    innerUrl = url || window.location.href
    instance = new URLSearchParams("?" + innerUrl.split('?')[1])
    return {
        getProperty(key) {
            return instance.get(key)
        },
        getAllProperty() {
            const properties = {}
            for (const [key, value] of instance.entries()) {
                properties[key] = value
            }
            return properties
        },
        instance
    }
}

export function clearConsole (){
    if (typeof console !== 'undefined' && typeof console.clear === 'function') {
        console.clear();
    }
}


export function genWeekReport(authorName = "", commitTypes=[],startDate =  dayjs().startOf("week").unix(), endDate = dayjs().endOf("week").unix()) {
  function shouldIncludeCommit(commit, authorName, startDate, endDate) {
    const commitTime = dayjs.unix(commit.timestamp);

    if (authorName && commit.authorName !== authorName) {
      return false;
    }

    if (startDate && commitTime.isBefore(dayjs.unix(startDate))) {
      return false;
    }
    if (endDate && commitTime.isAfter(dayjs.unix(endDate))) {
      return false;
    }

    return true;
  }
  function formatMessage(message, commitTypes, index) {
    commitTypes.forEach(type => {
      const prefix = `${type}:`;
      if (message.toLowerCase().startsWith(prefix)) {
        message = message.slice(prefix.length).trim();
      }
    });

    return `${index}:${message}`;
  }
  const regex = /^(\w+)\s+(\w+)\s+([^\s]+)\s+<([^>]+)>\s+(\d+)\s+([\+\-]\d{4})\s+(.*)$/gm;
  const commits = [];
  const filePath = path.join(process.cwd(), ".git", "logs", "HEAD");
  let resTypes = ['feat','fix','refactor','style','docs','perf','test','chore','revert','merge']
  if(commitTypes &&commitTypes.length>0){
    resTypes = resTypes.concat(commitTypes)
  }
  try {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });

    let match;
    while ((match = regex.exec(data)) !== null) {
      // 避免无限循环
      if (match.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      const message = match[7].replace(/^commit:\s*/, "").trim();
      const commit = {
        commitHash: match[1],
        parentCommitHash: match[2],
        authorName: match[3],
        authorEmail: match[4],
        timestamp: parseInt(match[5], 10),
        timezone: match[6],
        message: message
      };

      // 提前过滤不符合条件的提交记录
      if (shouldIncludeCommit(commit, authorName, startDate, endDate)) {
        commits.push(commit);
      }
    }
    return commits.sort((a, b) => a.timestamp - b.timestamp).map((item,index)=> formatMessage(item.message,resTypes,index+1)).join('');

  } catch (error) {
    console.error('An error occurred,idiot:'+ error);
    throw error; 
  }
}


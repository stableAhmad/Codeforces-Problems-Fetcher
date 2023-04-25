


const first = 1800
const last = 1815 //execluded


const url = ` https://codeforces.com/api/contest.standings?&contestId=`

const div1filter = "Div. 1"
const div2filter = "Div. 2"
const div3filter = "Div. 3"
//place the filters in line 22
//to remove the filter remove the .filter() from line 22
//.filter(contest=>{return contest.contest.name.includes(div2filter)})




function present(whole){
	let finale = ``
	whole.forEach(contest=>{
		const name = contest.contest.name
		let temp = `
			<div class="contestCard">
		<div class="contestName">${name},${contest.contest.id}</div>`

		const problems = contest.problems
		let content = ``
		problems.forEach( problem => {
			let temp2 = `<div class="problem">
				<a  href="https://codeforces.com/contest/${contest.contest.id}/problem/${problem.index}" class="letter">${problem.index}-${problem.name}</a>
			</div>`
			content+=temp2
		})
		temp+=content
		temp+='</div>'
		finale+=temp

	})
	return finale
}

function getContest(url,contestid){
	return new Promise((resolve, reject)=>{
		fetch(url)
		.then(response=>{
			if(response.ok){
				console.log(`fetched  ${contestid}`)
				return response

			} else{
				console.log(`missed ${contestid}`)
			}
		})
		.then(data => {
			resolve(data)
		})
		.catch(error => {
			reject(error)
		})
	})
}

async function loopOnEm(){
	let whole = []
	for(let i = first; i< last; i++){
		try{
		const temp = url+""+i+"&handles=;&showUnofficial=false"
		let result = await getContest(temp, i)
		 result = await result.json()
		whole.push(result.result)
		
	} catch(err){
		console.error(err)
	}
	
	}
	const html = present(whole)
	document.getElementById("a7a").innerHTML = html
}

loopOnEm()


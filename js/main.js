$(document).ready(function(){
    $('#searchUser').keyup(function(e){
        var userName=e.target.value;
        $.ajax({
            url:'https://api.github.com/users/'+userName,
            data:{
                client_id:'263e9393fb032dd60a3c',
                client_secret:'8395182bae2bb236f46df26ad7041048c757886b'
            }

        }).done(function(returnObj){

            $.ajax({
                url:'https://api.github.com/users/'+userName+'/repos',
                data:{
                client_id:'263e9393fb032dd60a3c',
                client_secret:'8395182bae2bb236f46df26ad7041048c757886b',
                sort:'created: asc',
                per_page:10
            }

            }).done(function(repos){
                $.each(repos,function(i,repo){
                    $('#repoContainer').append(`
                    <div class="well">
                        <div class="row text-left">
                            <div class="col-md-5">
                        
                            <strong>${repo.name}</strong> : ${repo.description}
                            </div>
                            <div class="col-md-5">
                            <span class="label label-primary"> Forks : ${repo.forks_count}</span>
                            <span class="label label-success">Public Gists :Wathchers ${repo.watchers}</span>
                            <span class="label label-info">Followers :${repo.stargazers_count}</span>

                        
                            </div>
                            <div class="col-md-2">
                        
                            <a href="${repo.html_url}" target="_blank" class="btn btn-success">Repos Page</a>
                            </div>
                        
                        </div>
                    
                    </div>
                    
                    `)
                })
               

            })


            $('#profile').html(`
                <div class="panel panel-default ">
                    <div class="panel panel-heading ">
                        <h3 class="panel-title">${returnObj.name}<h3>
                    </div>
                    <div class="panel panel-body ">
                         
                    <div class="row">
                            <div class="col-md-3 text-left">
                                <img  class="thumpnail avatar" src="${returnObj.avatar_url}">
                                <a target="_blank" class="btn btn-info btn-block" href="${returnObj.html_url}">View Profile</a>

                            </div>

                            <div class="col-md-9">
                                <span class="label label-primary">Public Reposetiry : ${returnObj.public_repos}</span>
                                <span class="label label-success">Public Gists : ${returnObj.public_gists}</span>
                                <span class="label label-info">Followers :${returnObj.followers}</span>
                                <span class="label label-default"> Following : ${returnObj.following}</span></br></br>

                                <ul class="list-group-item">
                                    <li class="list-group-item"> <strong>Company: </strong> ${returnObj.company}</li>
                                    <li class="list-group-item"><strong>Blog: </strong>${returnObj.blog}</li>
                                    <li class="list-group-item"><strong>Location: </strong>${returnObj.location}</li>
                                    <li class="list-group-item"> <strong>Member Since: </strong>${returnObj.created_at}</li>
                                </ul>

                            </div>
                
                    </div>

                    </div>
                </div>
                <h3>Latest Repos</h3>
                <div id="repoContainer">
                
                </div>
            
            
            `);


        })
    })
})



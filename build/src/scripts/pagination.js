new class{constructor(){this.paginationWrappers=document.querySelectorAll(".pcrafts-pagination"),this.init()}updateMarkup(e,t,s=!1){const a=e.closest(".pcrafts-block").querySelector(".pcrafts-posts-wrapper");s?jQuery(a).append(t):jQuery(a).html(t)}async fetchPosts(e,t){const{query:s,postId:a,blockId:r,template:c}=t.dataset,i={action:"paginate_posts",_ajax_nonce:POSTCRAFTS.nonce,postId:a,blockId:r,paged:e,template:c,query:{...JSON.parse(s),paged:e}},n=await jQuery.post(POSTCRAFTS.urls.ajaxUrl,i,(e=>e));return n.success&&t.setAttribute("data-page",e),n}handleLoadMore(e){const t=e.querySelector(".pcrafts-loadmore-btn");t&&t.addEventListener("click",(s=>{s.preventDefault();const{postsPerPage:a,page:r}=e.dataset;this.fetchPosts(parseInt(r)+1,e).then((s=>{s.success?this.updateMarkup(e,s.data,!0):(!s.success||s.data.length<a)&&t.classList.add("disabled")}))}))}handleArrow(e){const t=e.querySelector("button.pcrafts-prev"),s=e.querySelector("button.pcrafts-next");t&&t.addEventListener("click",(a=>{a.preventDefault();const{page:r}=e.dataset;this.fetchPosts(parseInt(r)-1,e).then((a=>{a.success&&(this.updateMarkup(e,a.data,!1),parseInt(r)-1==1&&t.classList.add("disabled"),s.classList.contains("disabled")&&s.classList.remove("disabled"))}))})),s&&s.addEventListener("click",(a=>{a.preventDefault();const{page:r,maxPage:c}=e.dataset;this.fetchPosts(parseInt(r)+1,e).then((a=>{a.success&&(this.updateMarkup(e,a.data,!1),parseInt(r)+1>=c&&s.classList.add("disabled"),t.classList.contains("disabled")&&t.classList.remove("disabled"))}))}))}toggleDisplay(e,t=!0){e&&(t?e.classList.remove("hide"):e.classList.add("hide"))}updatePages(e,t,s){const a=e.querySelector(".page-dots.first"),r=e.querySelector(".page-dots.last"),c=e.querySelector(".page-numbers.prev"),i=e.querySelector(".page-numbers.next"),n=e.querySelector(".page-numbers.first-page"),l=e.querySelector(".page-numbers.last-page"),p=e.querySelector(".page-numbers.current");p?.classList.remove("current");let o=[];t>=3?(o=[1,2,3],s>=3&&s===t?o=[t-2,t-1,t]:s>=3&&(o=[s-1,s,s+1])):2===t&&(o=[1,2]),this.toggleDisplay(c,s>1),this.toggleDisplay(a,s>3),this.toggleDisplay(n,s>2),this.toggleDisplay(r,t>s+2),this.toggleDisplay(l,t>s+1),this.toggleDisplay(i,t!==s),c.setAttribute("data-page",s-1),i.setAttribute("data-page",s+1),e.querySelectorAll(".middle-pages").forEach(((e,t)=>{e.innerHTML=o[t],e.setAttribute("data-page",o[t]),o[t]===s&&e.classList.add("current")}))}handlePagination(e){const t=e.querySelectorAll("li.page-numbers"),{maxPage:s}=e.dataset;t.forEach((t=>{t.addEventListener("click",(t=>{t.preventDefault();const a=parseInt(t.target.dataset.page);this.fetchPosts(a,e).then((t=>{t.success&&(this.updatePages(e,parseInt(s),a),this.updateMarkup(e,t.data,!1))}))}))}))}init(){this.paginationWrappers&&this.paginationWrappers.forEach((e=>{e.classList.contains("pcrafts-loadmore")?this.handleLoadMore(e):e.classList.contains("pcrafts-arrow")?this.handleArrow(e):this.handlePagination(e)}))}};
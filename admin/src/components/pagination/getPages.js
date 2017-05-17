/**
 * Created by jiayi on 2017/3/31.
 */

var pageOptions = {
  rotate: true,  // 当前页面显示在可见页面的中间
  maxSize: 5,  // 分页显示几个页面
  forceEllipses: true, // 是否有点
  boundaryLinkNumbers: true // 是否始终显示第一页和最后一页的数字。
}
/**
 * 创建模板中使用的page对象
 * @param number    页码
 * @param text      文字
 * @param isActive  是否当前页面
 * @returns {{number: *, text: *, active: *}}
 */
function makePage (number, text, isActive) {
  return {
    number: number,
    text: text,
    active: isActive
  }
}
/**
 * 设置分页文字显示
 * @param text
 * @returns {*}
 */
function pageLabel (text) {
  return text
}

/**
 * 设置分页一些配置信息
 * @param options
 */
export function setPageOptions (options) {
  pageOptions = Object.assign({}, pageOptions, options)
}
/**
 *
 * @param currentPage  当前页
 * @param totalPages   总页数
 * @param maxSize
 * @param boundaryLinkNumbers
 * @param forceEllipses
 * @returns {Array}
 */
export function getPages (currentPage, totalPages) {
  // 定义一个数组来存放可以显示分页的列表
  var pages = []

  // 默认页面限制
  let startPage = 1
  let endPage = totalPages
  var isMaxSized = pageOptions.maxSize > 0 && pageOptions.maxSize < totalPages

  // 重新计算如果maxSize
  if (isMaxSized) {
    if (pageOptions.rotate) {
      // 当前页面显示在可见页面的中间
      startPage = Math.max(currentPage - Math.floor(pageOptions.maxSize / 2), 1)
      endPage = startPage + pageOptions.maxSize - 1

      // 如果超出限制，则进行调整
      if (endPage > totalPages) {
        endPage = totalPages
        startPage = endPage - pageOptions.maxSize + 1
      }
    } else {
      // 可见页面使用maxSize进行分页
      startPage = (Math.ceil(currentPage / pageOptions.maxSize) - 1) * pageOptions.maxSize + 1
      // 如果超出限制，请调整最后一页
      endPage = Math.min(startPage + pageOptions.maxSize - 1, totalPages)
    }
  }

  // 添加页码链接
  for (let i = startPage; i <= endPage; i++) {
    var page = makePage(i, pageLabel(i), i === currentPage)
    pages.push(page)
  }

  // 添加链接以在页面集之间移动
  if (isMaxSized && pageOptions.maxSize > 0 && (!pageOptions.rotate || pageOptions.forceEllipses || pageOptions.boundaryLinkNumbers)) {
    if (startPage > 1) {
      //需要所有选项的省略号，除非范围太接近开始
      if (!pageOptions.boundaryLinkNumbers || startPage > 3) {
        var previousPageSet = makePage(startPage - 1, '...', false)
        pages.unshift(previousPageSet)
      }
      if (pageOptions.boundaryLinkNumbers) {
        //当按钮是顺序的时，需要更换省略号
        if (startPage === 3) {
          var secondPageLink = makePage(2, '2', false)
          pages.unshift(secondPageLink)
        }
        //添加第一页
        var firstPageLink = makePage(1, '1', false)
        pages.unshift(firstPageLink)
      }
    }

    if (endPage < totalPages) {
      //需要所有选项的省略号，除非范围太接近结束
      if (!pageOptions.boundaryLinkNumbers || endPage < totalPages - 2) {
        var nextPageSet = makePage(endPage + 1, '...', false)
        pages.push(nextPageSet)
      }
      if (pageOptions.boundaryLinkNumbers) {
        //当按钮是顺序的时，需要更换省略号
        if (endPage === totalPages - 2) {
          var secondToLastPageLink = makePage(totalPages - 1, totalPages - 1, false)
          pages.push(secondToLastPageLink)
        }
        //添加最后一页
        var lastPageLink = makePage(totalPages, totalPages, false)
        pages.push(lastPageLink)
      }
    }
  }
  return pages
}

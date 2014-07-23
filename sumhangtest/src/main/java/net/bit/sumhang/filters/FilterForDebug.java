package net.bit.sumhang.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FilterForDebug implements Filter {

	@Override
	public void destroy() {}

	@Override
	public void doFilter(
			ServletRequest request, ServletResponse response,
	    FilterChain next) throws IOException, ServletException {
		
		HttpServletRequest httpRequest = (HttpServletRequest)request;
		HttpServletResponse httpResponse = (HttpServletResponse)response;

		String servletPath = httpRequest.getServletPath();
		System.out.println("Filter Requested servletPath: "+servletPath);
		
		next.doFilter(request, response);
		
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {}

}













